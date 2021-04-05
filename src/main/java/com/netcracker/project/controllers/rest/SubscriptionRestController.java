package com.netcracker.project.controllers.rest;

import com.netcracker.project.model.Subscription;
import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.netcracker.project.url.UrlTemplates.*;

@RestController
public class SubscriptionRestController {
    @Autowired
    private EntityService entityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping(LOCAL_URL_GET_SUBSCRIPTION_BY_TASK_USER_IDS)
    public Subscription getSubscriptionByTaskUserIds(@PathVariable Long taskId, @PathVariable Long userId) {
        return entityService.getSubscriptionByTaskUserIds(taskId, userId);
    }

    @DeleteMapping(LOCAL_URL_DELETE_SUBSCRIPTION_BY_ID)
    public void deleteSubscriptionById(@PathVariable Long id) {
        entityService.deleteObject(id, URL_DELETE_SUBSCRIPTION_BY_ID);
    }

    @PostMapping(LOCAL_URL_POST_SUBSCRIPTION)
    public void postSubscription(@RequestBody String attrStr) {
        String[] attrArr = attrStr.split("&&&");
        Task task = entityService.getTaskById(Long.parseLong(attrArr[0]));
        User user = userDetailsService.getUserById(Long.parseLong(attrArr[1]));

        Subscription subscription = new Subscription(null, user, task);
        entityService.postSubscription(subscription);
    }
}
