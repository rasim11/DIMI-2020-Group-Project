package com.netcracker.project.controllers;

import com.netcracker.project.model.Task;
import com.netcracker.project.model.TaskStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.netcracker.project.url.UrlTemplates.*;
import static com.netcracker.project.url.UrlTemplates.GET_TASK_LIST;

@Controller
@RequestMapping(API + VERSION)
public class MainController {
    @GetMapping(MAIN_PAGE)
    public String mainPageGet(Model model) {
        String url = SERVER + API + VERSION + GET_TASK_LIST;
        System.out.println(url);

        RestTemplate restTemplate = new RestTemplate();
        List<Task> listTask;
        ResponseEntity<Task[]> response =
                restTemplate.getForEntity(
                        SERVER + API + VERSION + GET_TASK_LIST,
                        Task[].class);
        Task[] taskArray = response.getBody();
        listTask = Arrays.asList(taskArray);
        model.addAttribute("taskList", listTask);

        return "main";
    }

    @PostMapping(FIND)
    public String find(@RequestParam(required = false, defaultValue = "") String find, Model model) {

        System.out.println("filter = " + find);

        model.addAttribute("find", find);

        RestTemplate restTemplate = new RestTemplate();
        List<Task> listTask;
        ResponseEntity<Task[]> response =
                restTemplate.getForEntity(
                        SERVER + API + VERSION + GET_TASK_LIST + "/" + find,
                        Task[].class);
        Task[] taskArray = response.getBody();
        listTask = Arrays.asList(taskArray);
        model.addAttribute("taskList", listTask);

        return "main";
    }

    @PostMapping(FILTER)
    public String findByStatus(@ModelAttribute("IN_CREATING") String IN_CREATING,
                               @ModelAttribute("IN_PROCESSING") String IN_PROCESSING,
                               @ModelAttribute("RESOLVED") String RESOLVED,
                               @ModelAttribute("CANCELED") String CANCELED,
                               Model model
    ) {
        List<Integer> filterParam = new ArrayList<Integer>();
        boolean filterWork = false;

        if (IN_CREATING.contains("on")) {
            filterWork = true;
            filterParam.add(TaskStatus.IN_CREATING.ordinal());
            model.addAttribute("IN_CREATING", true);
        } else model.addAttribute("IN_CREATING", false);

        if (IN_PROCESSING.contains("on")) {
            filterWork = true;
            filterParam.add(TaskStatus.IN_PROCESSING.ordinal());
            model.addAttribute("IN_PROCESSING", true);
        } else model.addAttribute("IN_PROCESSING", false);

        if (RESOLVED.contains("on")) {
            filterWork = true;
            filterParam.add(TaskStatus.RESOLVED.ordinal());
            model.addAttribute("RESOLVED", true);
        } else model.addAttribute("RESOLVED", false);
        if (CANCELED.contains("on")) {
            filterWork = true;
            filterParam.add(TaskStatus.CANCELED.ordinal());
            model.addAttribute("CANCELED", true);
        } else model.addAttribute("CANCELED", false);

        List<Task> listTask;
        RestTemplate restTemplate = new RestTemplate();

        if (filterWork) {
            String url = SERVER + API + VERSION + GET_TASK_LIST + FILTER;
            Task[] response = restTemplate.postForObject(url, (Object) filterParam, Task[].class);
            listTask = Arrays.asList(response);
        } else {
            ResponseEntity<Task[]> response =
                    restTemplate.getForEntity(
                            SERVER + API + VERSION + GET_TASK_LIST,
                            Task[].class);
            Task[] taskArray = response.getBody();
            listTask = Arrays.asList(taskArray);
        }

        model.addAttribute("taskList", listTask);
        return "main";
    }
}
