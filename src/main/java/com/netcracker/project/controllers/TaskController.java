package com.netcracker.project.controllers;

import com.netcracker.project.model.Task;
import com.netcracker.project.model.TaskStatus;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.function.Predicate;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class TaskController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private EntityService entityService;

    @GetMapping(LOCAL_URL_POST_TASK)
    public String getAddTaskForm(Model model) {
        model.addAttribute("taskForm", new Task());
        return "taskAddForm";
    }

    @PostMapping(LOCAL_URL_POST_TASK)
    public String addNewTask(@ModelAttribute("task") Task task,
                             @RequestParam("image") MultipartFile file) throws IOException {
        if (!file.isEmpty()) {
            task.setTaskImage(Base64.getEncoder().encodeToString(file.getBytes()));
        }
        User user = securityService.getCurrentUser();
        entityService.postTask(user, task);
        return REDIRECT_ON_MAIN_PAGE;
    }

    @GetMapping(LOCAL_URL_GET_TASK_BY_ID + "/{id}")
    public String getTask(@PathVariable Long id, Model model) {
        Task task = entityService.getTaskByID(id);
        model.addAttribute("task", task);
        model.addAttribute("urls", API + VERSION + TASK_MANAGEMENT + TASK_UPDATE + BY_ID);
        if (securityService.isAuthenticated()) {
            model.addAttribute("commentPermission", true);
            User currentUser = securityService.getCurrentUser();
            Predicate<String> userRole = str -> str.equals("Пользователь") || str.equals("Соц. работник");
            Predicate<TaskStatus> taskStatus = x -> x.equals(TaskStatus.RESOLVED) || x.equals(TaskStatus.CANCELED);
            if (userRole.test(currentUser.getRole().getName())) {
                User author = task.getAuthor();
                if (author.getEmail().equals(currentUser.getEmail())) {
                    if (!taskStatus.test(task.getTaskStatus())) {
                        model.addAttribute("isEditAuthor", true);
                    } else if (task.getTaskStatus().equals(TaskStatus.RESOLVED)) {
                        model.addAttribute("isFeedback", true);
                    }
                }
            } else if (currentUser.getRole().getName().equals("Ответственный") && !taskStatus.test(task.getTaskStatus())) {
                model.addAttribute("isEditResponsible", true);
            }
        }
        return "specificTask";
    }

    @GetMapping(API + VERSION + TASK_MANAGEMENT + TASK_UPDATE + BY_ID + "/{id}")
    public String updateTask(@PathVariable Long id, Model model) {
        model.addAttribute("task", entityService.getTaskByID(id));
        return "taskEditForm";
    }
}
