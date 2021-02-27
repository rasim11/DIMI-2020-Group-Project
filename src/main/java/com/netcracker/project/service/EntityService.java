package com.netcracker.project.service;

import com.netcracker.project.model.Role;
import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class EntityService {
    public static final String urlGetRoleById = SERVER + API + VERSION + ROLE_MANAGEMENT + ROLE_GET +
            BY_ID + "{id}";
    public static final String urlGetRoleByName = SERVER + API + VERSION + ROLE_MANAGEMENT + ROLE_GET +
            BY_NAME + "{name}";
    public static final String urlPostTask = SERVER + API + VERSION + TASK_MANAGEMENT + TASK_POST;

    @Autowired
    private RestTemplate restTemplate;

    public Role getRoleById(Long id) {
        return restTemplate.getForObject(urlGetRoleById, Role.class, id);
    }

    public Role getRoleByName(String name) {
        return restTemplate.getForObject(urlGetRoleByName, Role.class, name);
    }

    public void postTask(User user, Task task) {
        task.dataExtension(user);
        restTemplate.postForLocation(urlPostTask, task);
    }
}
