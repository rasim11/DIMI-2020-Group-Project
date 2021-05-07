package com.netcracker.project.controllers.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.netcracker.project.model.*;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.MailService;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;

import static com.netcracker.project.url.UrlTemplates.*;

@RestController
public class TaskRestController {
    @Autowired
    private EntityService entityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private MailService mailService;

    @PutMapping(LOCAL_URL_CHANGE_TASK_DEPUTY)
    public void changeDeputy(@RequestBody String attrStr) {
        long[] attr = Arrays.stream(attrStr.split("&&&")).mapToLong(Long::parseLong).toArray();

        Task task = entityService.getTaskById(attr[0]);
        User previousResponsible = task.getCurrResponsible() != null ? task.getCurrResponsible() :
                task.getRegion().getResponsible();
        User responsible = userDetailsService.getUserById(attr[1]);

        task.setCurrResponsible(responsible);
        entityService.putTask(task);
        History history = new History(null, task, previousResponsible, responsible, LocalDateTime.now());
        entityService.postHistory(history);
    }

    @PutMapping(LOCAL_URL_CHANGE_TASK_PRIORITY)
    public void changePriority(@RequestBody String attrStr) {
        String[] attr = attrStr.split("&&&");

        Task task = entityService.getTaskById(Long.parseLong(attr[0]));
        task.setPriority(Priority.valueOf(attr[1]));
        entityService.putTask(task);
    }

    @PutMapping(LOCAL_URL_CHANGE_TASK_STATUS)
    public void changeStatus(@RequestBody String attrStr) {
        String[] attr = attrStr.split("&&&");

        Task task = entityService.getTaskById(Long.parseLong(attr[0]));
        task.setStatus(Status.valueOf(attr[1]));

        if (task.getStatus().equals(Status.RESOLVED)) {
            task.setCompleteDate(LocalDateTime.now());

            for (User socialWorker : entityService.getSocialWorkersByActiveTaskId(task.getId())) {
                socialWorker.setTasksCount(socialWorker.getTasksCount() + 1);
                userDetailsService.putUser(socialWorker);
            }

            User responsible = task.getRegion().getResponsible();
            User curResponsible = task.getCurrResponsible();

            if (responsible != null && curResponsible != null && responsible.getId().equals(curResponsible.getId())) {
                responsible.setTasksCount(responsible.getTasksCount() + 1);
                userDetailsService.putUser(responsible);
            } else {
                if (responsible != null) {
                    responsible.setTasksCount(responsible.getTasksCount() + 1);
                    userDetailsService.putUser(responsible);
                }

                if (curResponsible != null) {
                    curResponsible.setTasksCount(curResponsible.getTasksCount() + 1);
                    userDetailsService.putUser(curResponsible);
                }
            }

            User curUser = securityService.getCurrentUser();
            securityService.autoLogin(curUser.getEmail(), curUser.getPasswordConfirm());
        } else if (task.getStatus().equals(Status.CANCELED) || task.getStatus().equals(Status.REJECTED)) {
            task.setCompleteDate(LocalDateTime.now());

            if (task.getStatus().equals(Status.CANCELED)) {
                User author = task.getAuthor();
                author.setTasksCount(author.getTasksCount() - 1);
                userDetailsService.putUser(author);
            }

            User curUser = securityService.getCurrentUser();
            securityService.autoLogin(curUser.getEmail(), curUser.getPasswordConfirm());
        }

        entityService.putTask(task);

        mailService.sendMail(task);
    }

    @GetMapping(LOCAL_URL_GET_TASKS)
    public JsonNode getAllTasks() {
        return entityService.getAllObjects(URL_GET_TASK_LIST);
    }

    @GetMapping(LOCAL_URL_GET_FIRST_BY_BLOCKED)
    public Iterable<Task> getBlockedByFirst(@PathVariable Long id) {
        Iterable<Task> tasks = entityService.getFirstFromBlocked(id);
        return tasks == null ? Collections.emptyList() : tasks;
    }

    @GetMapping(LOCAL_URL_GET_ORIGIN_BY_DUPLICATE)
    public Iterable<Task> getOriginTaskByDuplicate(@PathVariable Long id) {
        Iterable<Task> tasks = entityService.getOriginTaskFromDuplicate(id);
        return tasks == null ? Collections.emptyList() : tasks;
    }

    @PostMapping(LOCAL_URL_POST_DUPLICATES_TASKS)
    public void postDuplicates(@RequestBody String attrStr) {
        entityService.postStringObj(attrStr, 0);
    }

    @PostMapping(LOCAL_URL_POST_BLOCKED_TASKS)
    public void postBlocked(@RequestBody String attrStr) {
        entityService.postStringObj(attrStr, 1);
    }

    @GetMapping(LOCAL_URL_GET_LINKED_TASKS)
    public Iterable<Task> getLinkedTasks(@PathVariable Long id) {
        Iterable<Task> tasks = entityService.getLinkedTasks(id);
        return tasks == null ? Collections.emptyList() : tasks;
    }

    @PostMapping(LOCAL_URL_POST_LINKED_TASKS)
    public void postLinked(@RequestBody String attrStr) {
        entityService.postStringObj(attrStr, 2);
    }
}
