package com.netcracker.project.controllers;

import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class TaskController {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private EntityService entityService;

    @GetMapping(API + VERSION + TASK_MANAGEMENT + TASK_POST)
    public String getAddTaskForm(Model model) {
        model.addAttribute("taskForm", new Task());
        return "taskAddForm";
    }

    @PostMapping(API + VERSION + TASK_MANAGEMENT + TASK_POST)
    public String addNewTask(@ModelAttribute("taskForm") Task task) {
        User user = securityService.getCurrentUser();
        entityService.postTask(user, task);
        return REDIRECT_ON_MAIN_PAGE;
    }

    @GetMapping("/get-task")
    public String getTask(@RequestParam("id") Long id, Model model) {
        Task task = restTemplate.getForObject("http://localhost:8082/get-task/{id}", Task.class, id);
        model.addAttribute("task", task);
        return "taskEditForm";
    }
}
