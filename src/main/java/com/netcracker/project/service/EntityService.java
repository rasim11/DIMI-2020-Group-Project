package com.netcracker.project.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.project.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Set;

import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class EntityService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper mapper;
    public void postTask(User user, Task task) {
        System.out.println(task.getTaskLocation().split(",")[1].trim());
        Region region=restTemplate.getForObject(URL_GET_REGION_BY_NAME,Region.class,task.getTaskLocation().split(",")[1].trim());
        System.out.println(region);
        if (region == null) {
            throw new UsernameNotFoundException("DB fatal error. User Region not found!");
        }
        task.setRegion(region);
        task.setCurrResponsible(region.getResponsible());

        task.trim();
        task.dataExtension(user);
        restTemplate.postForLocation(URL_POST_TASK, task);
    }

    public Task getTaskById(Long id) {
        return restTemplate.getForObject(URL_GET_TASK_BY_ID, Task.class, id);
    }

    public JsonNode getAllObjects(String url) {
        return restTemplate.getForObject(url, JsonNode.class);
    }

    public Region getRegionById(Long id) {
        return restTemplate.getForObject(URL_GET_REGION_BY_ID, Region.class, id);
    }

    public void putRegion(Region region) {
        restTemplate.put(URL_PUT_REGION, region);
    }
    public void putRegions(Iterable<Region> region) {
        restTemplate.postForLocation(URL_POST_STANDARD_REGIONS, region);
    }

    public Region getRegionByResponsibleEmail(String email) {
        return restTemplate.getForObject(URL_GET_REGION_BY_RESPONSIBLE_EMAIL, Region.class, email);
    }

    public Iterable<Task> getTasksByAuthorsEmail(String email) {
        JsonNode objects = restTemplate.getForObject(URL_GET_TASKS_BY_AUTHORS_EMAIL, JsonNode.class, email);
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

    public Set<User> getSocialWorkersByActiveTaskId(Long id) {
        JsonNode objects = restTemplate.getForObject(URL_GET_WORKERS_BY_TASK_ID, JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Set<User>>() {
                }
        );
    }

    public Set<Task> getActiveTaskBySocialWorkersId(Long id) {
        JsonNode objects = restTemplate.getForObject(URL_GET_TASKS_BY_WORKER_ID, JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Set<Task>>() {
                }
        );
    }

    public void deleteObject(Long id, String url) {
        restTemplate.delete(url, id);
    }

    public void postActiveTask(Long taskId, Long userId) {
        Long[] ids = {taskId, userId};
        restTemplate.postForLocation(URL_POST_ACTIVE_TASK, ids);
    }

    public void postFeedback(Feedback feedback) {
        restTemplate.postForLocation(URL_POST_FEEDBACK, feedback);
    }

    public Feedback getFeedbackByTaskId(Long id) {
        return restTemplate.getForObject(URL_GET_FEEDBACK_BY_TASK_ID, Feedback.class, id);
    }

    public Subscription getSubscriptionByTaskUserIds(Long taskId, Long userId) {
        return restTemplate.getForObject(URL_GET_SUBSCRIPTION_BY_TASK_USER_IDS, Subscription.class, taskId, userId);
    }

    public void postSubscription(Subscription subscription) {
        restTemplate.postForLocation(URL_POST_SUBSCRIPTION, subscription);
    }

    public Iterable<Task> getTasksByCurrResponsibleId(Long id){
        JsonNode objects = restTemplate.getForObject(URL_GET_TASKS_BY_CURR_RESPONSIBLE_ID, JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
    }
    public Iterable<History> getHistoryByTaskId(Long id){
        JsonNode objects = restTemplate.getForObject(URL_GET_HISTORY_BY_TASK_ID , JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<History>>() {
                }
        );
    }
    public void postHistory(History history){
        restTemplate.postForLocation(URL_POST_HISTORY, history);
    }
}
