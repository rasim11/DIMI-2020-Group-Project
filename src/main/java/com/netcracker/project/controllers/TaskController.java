package com.netcracker.project.controllers;

import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

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
    public String addNewTask(@ModelAttribute("taskForm") Task task,
                             @RequestParam("image") MultipartFile file) throws IOException {
        if (!file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            System.out.println(fileName);
            task.setTaskImage(Base64.getEncoder().encodeToString(file.getBytes()));
        }
        User user = securityService.getCurrentUser();
        entityService.postTask(user, task);
        return REDIRECT_ON_MAIN_PAGE;
    }

    @GetMapping(API + VERSION + TASK_MANAGEMENT + TASK_GET + BY_ID + "/{id}")
    public String getTask(@PathVariable("id") Long id, Model model) {
        model.addAttribute("task", entityService.getTaskByID(id));
        return "taskEditForm";
    }
}
