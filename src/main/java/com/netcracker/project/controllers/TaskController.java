package com.netcracker.project.controllers;

import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Controller
@Slf4j
public class TaskController {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private EntityService entityService;

    @GetMapping("/add-task")
    public String getAddTaskForm(Model model){
        if (!securityService.isAuthenticated()) {
            return "redirect:/";
        }
        User user = userDetailsService.getUserByEmail(securityService.getCurrentEmail());
        model.addAttribute("userFirstname", user.getFirstname());
        return "taskAddForm";
    }
    @GetMapping("/get-task")
    public String getTask(@RequestParam("id") Long id, Model model){
        if (!securityService.isAuthenticated()) {
            return "redirect:/";
        }
        Task task = restTemplate.getForObject("http://localhost:8082/get-task/{id}",Task.class,id);
        model.addAttribute("task",task);
        return "taskEditForm";
    }
    @PostMapping("/add-task")
    public String addNewTask(@ModelAttribute("taskForm") Task task){
        if (!securityService.isAuthenticated()) {
            return "redirect:/";
        }
        User user = userDetailsService.getUserByEmail(securityService.getCurrentEmail());
        entityService.addTask(user,task);
        return "redirect:/";
    }
}
