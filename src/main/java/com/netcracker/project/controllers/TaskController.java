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
    public String addNewTask(@ModelAttribute("taskForm") Task taskForm, Model model) {
        User user = securityService.getCurrentUser();
        if (entityService.postTask(user, taskForm)) {
            user.setTasksCount(user.getTasksCount() + 1);
            userDetailsService.putUser(user);

            securityService.autoLogin(user.getEmail(), user.getPasswordConfirm());

            return REDIRECT_ON_MAIN_PAGE;
        } else {
            String[] taskImages = taskForm.getTaskImage().length() != 0 ?
                    taskForm.getTaskImage().split(" ") : null;

            model.addAttribute("regionNotFound",
                    "В данном регионе платформа Social Issues Tracker не поддерживается!");
            model.addAttribute("taskImages", taskImages);
            return "task-add";
        }
    }

    @GetMapping(LOCAL_URL_GET_TASK_BY_ID)
    public String getTask(@PathVariable Long id, Model model) {
        Task task = entityService.getTaskById(id);
        if (task == null) {
            return REDIRECT_ON_MAIN_PAGE;
        }

        task.setFeedback(entityService.getFeedbackByTaskId(task.getId()));
        String[] taskImages = task.getTaskImage().length() != 0 ? task.getTaskImage().split(" ") : null;

        Iterable<Task> originTask = entityService.getOriginTaskFromDuplicate(task.getId());
        model.addAttribute("originTask", originTask);

        Iterable<Task> duplicateTask = entityService.getDuplicateTasksFromOrigin(task.getId());
        model.addAttribute("duplicateTask", duplicateTask);

        Iterable<Task> firstTasks = entityService.getFirstFromBlocked(task.getId());
        model.addAttribute("firstTasks", firstTasks);

        Iterable<Task> blockedTask = entityService.getBlockedFromFirst(task.getId());
        model.addAttribute("blockedTask", blockedTask);

        Iterable<Task> linkedTask = entityService.getLinkedTasks(task.getId());
        model.addAttribute("linkedTask", linkedTask);

        model.addAttribute("histories", entityService.getHistoryByTaskId(id));
        model.addAttribute("task", task);
        model.addAttribute("taskImages", taskImages);
        model.addAttribute("checkFeedback", entityService.getCommentByTaskId(id));

        if (securityService.isAuthenticated()) {
            User curUser = securityService.getCurrentUser();
            User author = task.getAuthor();
            Region curRegion = entityService.getRegionByResponsibleEmail(curUser.getEmail());

            if (!author.getEmail().equals(curUser.getEmail())) {
                model.addAttribute("isSubscription", true);
            }

            if (curUser.getRole().equals(Role.RESPONSIBLE) && curRegion != null &&
                    task.getRegion().getRegionName().equals(curRegion.getRegionName()) ||
                    curUser.getRole().equals(Role.DEPUTY) && task.getCurrResponsible() != null &&
                            task.getCurrResponsible().getEmail().equals(curUser.getEmail())) {
                model.addAttribute("isLinkedProblemsChange", true);

                if (task.getStatus().equals(Status.CANCELED) || task.getStatus().equals(Status.REJECTED) ||
                        task.getStatus().equals(Status.CANCELED_AS_DUPLICATE)) {
                    if (task.getStatus().equals(Status.CANCELED_AS_DUPLICATE)) {
                        model.addAttribute("isMainProblemsChange", true);

                        if (originTask == null) {
                            List<Status> statuses = Arrays.stream(Status.values()).collect(toCollection(ArrayList::new));
                            statuses.remove(task.getStatus());
                            statuses.remove(Status.CANCELED);
                            statuses.remove(Status.REJECTED);
                            model.addAttribute("statuses", statuses);
                        }
                    }
                    return "specific-task";
                }

                if (!task.getStatus().equals(Status.RESOLVED)) {
                    List<User> responsibleList = new ArrayList<>();
                    userDetailsService.getUsersByRegionId(URL_GET_DEPUTIES_BY_REGION_ID,
                            task.getRegion().getId()).forEach(responsibleList::add);

                    if (task.getRegion().getResponsible() != null) {
                        responsibleList.add(task.getRegion().getResponsible());
                    }
                    responsibleList.remove(task.getCurrResponsible());

                    List<Priority> priorities = Arrays.stream(Priority.values()).collect(toCollection(ArrayList::new));
                    if (task.getPriority() != null) {
                        priorities.remove(task.getPriority());
                    }

                    List<Status> statuses = Arrays.stream(Status.values()).collect(toCollection(ArrayList::new));
                    statuses.remove(task.getStatus());
                    statuses.remove(Status.CANCELED);
                    statuses.remove(Status.REJECTED);

                    model.addAttribute("isEditResponsible", true);
                    model.addAttribute("responsibleList", responsibleList);
                    model.addAttribute("priorities", priorities);
                    model.addAttribute("statuses", statuses);
                }
            } else if (task.getStatus().equals(Status.CANCELED) || task.getStatus().equals(Status.REJECTED) ||
                    task.getStatus().equals(Status.CANCELED_AS_DUPLICATE)) {
                return "specific-task";
            } else if (curUser.getRole().equals(Role.USER) && author.getEmail().equals(curUser.getEmail())) {
                String param = task.getStatus().equals(Status.RESOLVED) ? "isFeedback" : "isEditAuthor";
                model.addAttribute(param, true);
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
                task.getStatus().equals(Status.RESOLVED) || task.getStatus().equals(Status.CANCELED) ||
                task.getStatus().equals(Status.REJECTED) || task.getStatus().equals(Status.CANCELED_AS_DUPLICATE)) {
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

        if (task == null || (task.getRegion().getResponsible() == null ||
                !task.getRegion().getResponsible().getId().equals(curUser.getId())) &&
                (task.getCurrResponsible() == null || !task.getCurrResponsible().getId().equals(curUser.getId())) ||
                task.getStatus().equals(Status.RESOLVED) || task.getStatus().equals(Status.CANCELED) ||
                task.getStatus().equals(Status.REJECTED) || task.getStatus().equals(Status.CANCELED_AS_DUPLICATE)) {
            return REDIRECT_ON_MAIN_PAGE;
        }

        task.setSocialWorkers(entityService.getSocialWorkersByActiveTaskId(task.getId()));
        Set<User> socialWorkers = new LinkedHashSet<>();
        userDetailsService.getUsersByRegionId(URL_GET_WORKERS_BY_REGION_ID,
                task.getRegion().getId()).forEach(socialWorkers::add);

        for (User socialWorker : task.getSocialWorkers()) {
            socialWorkers.remove(socialWorker);
            socialWorker.setActiveTasks(entityService.getActiveTaskBySocialWorkersId(socialWorker.getId()));
        }
        for (User socialWorker : socialWorkers) {
            socialWorker.setActiveTasks(entityService.getActiveTaskBySocialWorkersId(socialWorker.getId()));
        }

        model.addAttribute("task", task);
        model.addAttribute("socialWorkers", socialWorkers);

        return "responsible-edit-task";
    }

    @PostMapping(LOCAL_URL_RESPONSIBLE_PUT_TASK)
    public String responsibleEditTaskPost(@PathVariable Long id,
                                          @ModelAttribute("task") Task taskForm,
                                          @RequestParam("email") @Nullable String[] emails) {
        Task task = entityService.getTaskById(id);

        entityService.deleteObject(id, URL_DELETE_ACTIVE_TASK_BY_TASK_ID);

        if (emails != null) {
            for (String email : emails) {
                User socialWorker = userDetailsService.getUserByEmail(email);
                entityService.postActiveTask(task.getId(), socialWorker.getId());
            }
        }

        return "redirect:" + LOCAL_URL_GET_TASK_BY_ID.replace("{id}", id.toString());
    }
}
