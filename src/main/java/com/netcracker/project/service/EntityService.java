package com.netcracker.project.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.project.model.Role;
import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class EntityService {
    public static final String URL_GET_ROLE_BY_NAME = SERVER + API + VERSION + ROLE_MANAGEMENT + ROLE_GET +
            BY_NAME + "/{name}";
    public static final String URL_POST_TASK = SERVER + API + VERSION + TASK_MANAGEMENT + TASK_POST;
    public static final String URL_GET_ALL_ROLES = SERVER + API + VERSION + ROLE_MANAGEMENT + ALL_ROLES_GET;
    public static final String URL_GET_TASK_BY_ID = SERVER + API + VERSION + TASK_MANAGEMENT + TASK_GET + BY_ID + "/{id}";

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper mapper;

    public Role getRoleByName(String name) {
        return restTemplate.getForObject(URL_GET_ROLE_BY_NAME, Role.class, name);
    }

    public void postTask(User user, Task task) {
        task.dataExtension(user);
        restTemplate.postForLocation(URL_POST_TASK, task);
    }

    public Iterable<Role> getAllRoles() {
        JsonNode roles = restTemplate.getForObject(URL_GET_ALL_ROLES, JsonNode.class);
        return mapper.convertValue(roles,
                new TypeReference<Iterable<Role>>() {
                }
        );
    }
    public Task getTaskByID(Long id){
        return restTemplate.getForObject(URL_GET_TASK_BY_ID,Task.class,id);
    }
}
