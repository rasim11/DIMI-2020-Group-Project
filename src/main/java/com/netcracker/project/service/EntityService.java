package com.netcracker.project.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.project.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class EntityService {
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

    public Task getTaskByID(Long id) {
        return restTemplate.getForObject(URL_GET_TASK_BY_ID, Task.class, id);
    }

    public <T> Iterable<T> getAllObjects(String url) {
        JsonNode objects = restTemplate.getForObject(url, JsonNode.class);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<T>>() {
                }
        );
    }

    public Region getRegionById(Long id) {
        return restTemplate.getForObject(URL_GET_REGION_BY_ID, Region.class, id);
    }

    public void putRegion(Region region) {
        restTemplate.put(URL_PUT_REGION, region);
    }

    public Region getRegionByResponsible(User user) {
        return restTemplate.postForObject(URL_GET_REGION_BY_RESPONSIBLE, user, Region.class);
    }

    public Iterable<Task> getTasksByAuthor(User user) {
        JsonNode objects = restTemplate.postForObject(URL_GET_TASKS_BY_AUTHOR, user, JsonNode.class);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
    }

    public void putTask(Task task) {
        restTemplate.postForLocation(URL_POST_TASK, task);
    }

    public void postComment(Comment comment) {
        restTemplate.postForLocation(URL_POST_COMMENT, comment);
    }

    public Iterable<Comment> getCommentByTaskId(Long id) {
        JsonNode objects = restTemplate.getForObject(URL_GET_COMMENT_BY_TASK_ID, JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Comment>>() {
                }
        );
    }
}
