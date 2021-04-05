package com.netcracker.project.controllers;

import com.netcracker.project.model.*;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.netcracker.project.url.UrlTemplates.*;
import static java.util.stream.Collectors.toCollection;

@Controller
public class TaskController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private EntityService entityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping(LOCAL_URL_POST_TASK)
    public String getAddTaskForm(Model model) {
        model.addAttribute("taskForm", new Task());
        return "task-add";
    }

    @PostMapping(LOCAL_URL_POST_TASK)
    public String addNewTask(@ModelAttribute("taskForm") Task taskForm) {
        User user = securityService.getCurrentUser();
        user.setTasksCount(user.getTasksCount() + 1);
        userDetailsService.putUser(user);

        entityService.postTask(user, taskForm);
        securityService.autoLogin(user.getEmail(), user.getPasswordConfirm());

        return REDIRECT_ON_MAIN_PAGE;
    }

    @GetMapping(LOCAL_URL_GET_TASK_BY_ID)
    public String getTask(@PathVariable Long id, Model model) {
        Task task = entityService.getTaskById(id);
        if (task == null) {
            return REDIRECT_ON_MAIN_PAGE;
        }

        task.setFeedback(entityService.getFeedbackByTaskId(task.getId()));
        String[] taskImages = task.getTaskImage().length() != 0 ? task.getTaskImage().split(" ") : null;

        model.addAttribute("task", task);
        model.addAttribute("taskImages", taskImages);

        if (securityService.isAuthenticated()) {
            model.addAttribute("commentPermission", true);

            if (task.getStatus().equals(Status.CANCELED)) {
                return "specific-task";
            }

            User curUser = securityService.getCurrentUser();
            Region curRegion = entityService.getRegionByResponsibleEmail(curUser.getEmail());

            if (curUser.getRole().equals(Role.USER)) {
                User author = task.getAuthor();
                if (author.getEmail().equals(curUser.getEmail())) {
                    String param = task.getStatus().equals(Status.RESOLVED) ? "isFeedback" : "isEditAuthor";
                    model.addAttribute(param, true);
                } else if (!task.getStatus().equals(Status.RESOLVED)) {
                    model.addAttribute("isSubscription", true);
                }
            } else if (curUser.getRole().equals(Role.RESPONSIBLE) && !task.getStatus().equals(Status.RESOLVED) &&
                    task.getRegion().getRegionName().equals(curRegion.getRegionName())) {
                model.addAttribute("isEditResponsible", true);
            }
        } else {
            model.addAttribute("commentForbidden",
                    "Комментировать может только зарегистрированный пользователь!");
        }

        return "specific-task";
    }

    @GetMapping(LOCAL_URL_AUTHOR_PUT_TASK)
    public String updateTaskGet(@PathVariable Long id, Model model) {
        Task task = entityService.getTaskById(id);
        User curUser = securityService.getCurrentUser();

        if (task == null || task.getAuthor() == null || !task.getAuthor().getId().equals(curUser.getId()) ||
                task.getStatus().equals(Status.RESOLVED) || task.getStatus().equals(Status.CANCELED)) {
            return REDIRECT_ON_MAIN_PAGE;
        }

        String[] taskImages = task.getTaskImage().length() != 0 ? task.getTaskImage().split(" ") : null;

        model.addAttribute("taskForm", task);
        model.addAttribute("taskImages", taskImages);

        return "author-edit-task";
    }

    @PostMapping(LOCAL_URL_AUTHOR_PUT_TASK)
    public String updateTaskPost(@PathVariable Long id, @ModelAttribute("taskForm") Task taskForm) {
        Task task = entityService.getTaskById(id);

        taskForm.trim();
        task.dataExtension(taskForm);
        entityService.putTask(task);

        return "redirect:" + LOCAL_URL_GET_TASK_BY_ID.replace("{id}", id.toString());
    }

    @GetMapping(LOCAL_URL_RESPONSIBLE_PUT_TASK)
    public String responsibleEditTaskGet(@PathVariable Long id, Model model) {
        Task task = entityService.getTaskById(id);
        User curUser = securityService.getCurrentUser();

        if (task == null || task.getRegion().getResponsible() == null ||
                !task.getRegion().getResponsible().getId().equals(curUser.getId()) ||
                task.getStatus().equals(Status.RESOLVED) || task.getStatus().equals(Status.CANCELED)) {
            return REDIRECT_ON_MAIN_PAGE;
        }

        List<Status> statuses = Arrays.stream(Status.values()).collect(toCollection(ArrayList::new));
        statuses.remove(task.getStatus());
        statuses.remove(Status.CANCELED);

        List<Priority> priorities = Arrays.stream(Priority.values()).collect(toCollection(ArrayList::new));
        if (task.getPriority() != null) {
            priorities.remove(task.getPriority());
        }

        task.setSocialWorkers(entityService.getSocialWorkersByActiveTaskId(task.getId()));
        Set<User> socialWorkers = new LinkedHashSet<>();
        userDetailsService.getUsersByRegionId(task.getRegion().getId()).forEach(socialWorkers::add);

        for (User socialWorker : task.getSocialWorkers()) {
            socialWorkers.remove(socialWorker);
            socialWorker.setActiveTasks(entityService.getActiveTaskBySocialWorkersId(socialWorker.getId()));
        }
        for (User socialWorker : socialWorkers) {
            socialWorker.setActiveTasks(entityService.getActiveTaskBySocialWorkersId(socialWorker.getId()));
        }

        model.addAttribute("task", task);
        model.addAttribute("statuses", statuses);
        model.addAttribute("priorities", priorities);
        model.addAttribute("socialWorkers", socialWorkers);

        return "responsible-edit-task";
    }

    @PostMapping(LOCAL_URL_RESPONSIBLE_PUT_TASK)
    public String responsibleEditTaskPost(@PathVariable Long id,
                                          @ModelAttribute("task") Task taskForm,
                                          @RequestParam("email") @Nullable String[] emails) {
        Task task = entityService.getTaskById(id);
        task.dataExtension(taskForm.getStatus(), taskForm.getPriority());
        entityService.putTask(task);

        entityService.deleteObject(id, URL_DELETE_ACTIVE_TASK_BY_TASK_ID);

        if (emails != null) {
            for (String email : emails) {
                User socialWorker = userDetailsService.getUserByEmail(email);
                entityService.postActiveTask(task.getId(), socialWorker.getId());

                if (task.getStatus().equals(Status.RESOLVED)) {
                    socialWorker.setTasksCount(socialWorker.getTasksCount() + 1);
                    userDetailsService.putUser(socialWorker);
                }
            }
        }

        if (task.getStatus().equals(Status.RESOLVED)) {
            User responsible = task.getRegion().getResponsible();
            responsible.setTasksCount(responsible.getTasksCount() + 1);
            userDetailsService.putUser(responsible);

            securityService.autoLogin(responsible.getEmail(), securityService.getCurrentUser().getPasswordConfirm());
        }

        return "redirect:" + LOCAL_URL_GET_TASK_BY_ID.replace("{id}", id.toString());
    }
}
