package com.netcracker.project.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.project.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Set;

import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class EntityService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper mapper;

    public boolean postTask(User user, Task task) {
        if (!checkLocation(task)) {
            return false;
        }

        task.trim();
        task.dataExtension(user);
        restTemplate.postForLocation(URL_POST_TASK, task);
        return true;
    }

    public Task getTaskById(Long id) {
        return restTemplate.getForObject(URL_GET_TASK_BY_ID, Task.class, id);
    }

    public Iterable<Task> getOriginTaskFromDuplicate(Long taskId) {  // взять все оригиналы
        JsonNode objects = restTemplate.getForObject(URL_GET_ORIGIN_FROM_DUPLICATE, JsonNode.class, taskId);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
    }

    public Iterable<Task> getDuplicateTasksFromOrigin(Long taskId) {  // взять все оригиналы
        JsonNode objects = restTemplate.getForObject(URL_GET_DUPLICATE_FROM_ORIGIN, JsonNode.class, taskId);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
    }

    public Iterable<Task> getFirstFromBlocked(Long taskId) {
        JsonNode objects = restTemplate.getForObject(URL_GET_FIRST_FROM_BLOCKED, JsonNode.class, taskId);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
    }

    public Iterable<Task> getBlockedFromFirst(Long taskId) {
        JsonNode objects = restTemplate.getForObject(URL_GET_BLOCKED_FROM_FIRST, JsonNode.class, taskId);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
    }

    public Iterable<Task> getLinkedTasks(Long taskId) {
        System.out.println("getLinkedTasks");
        JsonNode objects = restTemplate.getForObject(URL_GET_LINKED_TASKS, JsonNode.class, taskId);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
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

    public Comment getFeedbackByTaskId(Long id) {
        return restTemplate.getForObject(URL_GET_FEEDBACK_BY_TASK_ID, Comment.class, id);
    }

    public Subscription getSubscriptionByTaskUserIds(Long taskId, Long userId) {
        return restTemplate.getForObject(URL_GET_SUBSCRIPTION_BY_TASK_USER_IDS, Subscription.class, taskId, userId);
    }

    public void postSubscription(Subscription subscription) {
        restTemplate.postForLocation(URL_POST_SUBSCRIPTION, subscription);
    }

    public Iterable<Task> getTasksByCurrResponsibleId(Long id) {
        JsonNode objects = restTemplate.getForObject(URL_GET_TASKS_BY_CURR_RESPONSIBLE_ID, JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
    }

    public Iterable<History> getHistoryByTaskId(Long id) {
        JsonNode objects = restTemplate.getForObject(URL_GET_HISTORY_BY_TASK_ID, JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<History>>() {
                }
        );
    }

    public void postHistory(History history) {
        restTemplate.postForLocation(URL_POST_HISTORY, history);
    }

    public Municipality getMunicipalityById(Long id) {
        return restTemplate.getForObject(URL_GET_MUNICIPALITY_BY_ID, Municipality.class, id);
    }

    public Iterable<History> getHistoriesByPreviousCurrentResponsibleId(Long id) {
        JsonNode objects = restTemplate.getForObject(URL_GET_HISTORIES_BY_PREVIOUS_CURRENT_RESPONSIBLE_ID,
                JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<History>>() {
                }
        );
    }

    public void postStringObj(String attrStr, int key) {
        long[] attr = Arrays.stream(attrStr.split("&&&")).mapToLong(Long::parseLong).toArray();

        if (key == 0) {
            deleteObject(attr[0], URL_DELETE_DUPLICATES_BY_ID);
        } else if (key == 1) {
            deleteObject(attr[0], URL_DELETE_BLOCKED_BY_ID);
        } else if (key == 2) {
            deleteObject(attr[0], URL_DELETE_LINKED_TASKS);
        }

        if (attr.length != 1) {
            String url = "";
            if (key == 0) {
                url = URL_POST_DUPLICATES_TASKS;
            } else if (key == 1) {
                url = URL_POST_BLOCKED_TASKS;
            } else if (key == 2) {
                url = URL_POST_LINKED_TASKS;
            }

            for (int i = 1; i < attr.length; i++) {
                String req = attr[i] + "&&&" + attr[0];
                restTemplate.postForLocation(url, req);
            }
        }
    }

    public Iterable<Subscription> getSubscriptionsByTaskId(Long id) {
        JsonNode objects = restTemplate.getForObject(URL_GET_SUBSCRIPTIONS_BY_TASK_ID, JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Subscription>>() {
                }
        );
    }

    public Iterable<Comment> getCommentsByAuthorId(Long id) {
        JsonNode objects = restTemplate.getForObject(URL_GET_COMMENTS_BY_AUTHOR, JsonNode.class, id);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Comment>>() {
                }
        );
    }

    public boolean checkLocation(Task task) {
        String[] locationsElem = task.getTaskLocation().split(",");
        if (locationsElem.length < 2) {
            return false;
        }

        Region region = restTemplate.getForObject(URL_GET_REGION_BY_NAME, Region.class, locationsElem[1].trim());
        if (region == null) {
            return false;
        }
        task.setRegion(region);
        task.setCurrResponsible(region.getResponsible());

        return true;
    }

    public Iterable<Task> getAllTasks() {
        JsonNode objects = restTemplate.getForObject(URL_GET_TASK_LIST, JsonNode.class);
        return mapper.convertValue(objects,
                new TypeReference<Iterable<Task>>() {
                }
        );
    }
}
