package com.netcracker.projectDb.controller;

import com.netcracker.projectDb.components.Standard;
import com.netcracker.projectDb.model.*;
import com.netcracker.projectDb.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

import static com.netcracker.projectDb.url.FilePaths.PATH_DEFAULT_AVATAR;
import static com.netcracker.projectDb.url.UrlTemplates.*;


@RestController
public class DbController {
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private RegionService regionService;
    @Autowired
    private TaskSocialWorkersService taskSocialWorkersService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private SubscriptionService subscriptionService;
    @Autowired
    private HistoryService historyService;
    @Autowired
    private MunicipalityService municipalityService;
    @Autowired
    private BlockingTasksService blockingTasksService;
    @Autowired
    private DuplicateTasksService duplicateTasksService;
    @Autowired
    private SimilarTasksService similarTasksService;

    @GetMapping(URL_GET_USER_BY_EMAIL)
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email).orElse(null);
    }

    @GetMapping(URL_GET_USER_BY_ID)
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
    }

    @PostMapping(URL_POST_USER)
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @GetMapping(URL_GET_TASK_BY_ID)
    public Task getTask(@PathVariable Long id) {
        return taskService.getTaskById(id).orElse(null);
    }

    @PostMapping(URL_POST_TASK)
    public void addTask(@RequestBody Task task) {
        taskService.addTask(task);
    }

    @PostMapping(URL_POST_COMMENT)
    public void postComment(@RequestBody Comment comment) {
        commentService.postComment(comment);
    }

    @GetMapping(URL_GET_COMMENT_BY_TASK_ID)
    public Iterable<Comment> getCommentByTaskId(@PathVariable Long id) {
        return commentService.getCommentsByTaskId(id);
    }

    @GetMapping(URL_POST_ADMIN)
    public void addAdmin() {
        Optional<User> admin = userService.getUserByEmail("a@admin.ru");
        if (!admin.isPresent()) {
            User user = new User(null,
                    "Админов",
                    "Админ",
                    "Админович",
                    Standard.getBase64StandardAvatar(PATH_DEFAULT_AVATAR),
                    Role.ADMIN,
                    "a@admin.ru",
                    "123",
                    "$2a$10$H1itEA0gacJqp7.k5knFeunepBoE99GF9HzTqYExClu6Y6asN6ly.",
                    null,
                    LocalDateTime.now(),
                    null,
                    null,
                    null,
                    true,
                    null);

            userService.addUser(user);
        }
    }

    @DeleteMapping(URL_DELETE_USER)
    public void deleteUser(@PathVariable String email) {
        userService.deleteUser(email);
    }

    @GetMapping(URL_GET_ALL_USERS)
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(URL_ADD_STANDARD_REGIONS)
    public void addStandardRegions() {
        regionService.addStandards();
    }

    @GetMapping(URL_GET_REGION_BY_NAME)
    public Region getRegionByName(@PathVariable("name") String regionName) {
        return regionService.getRegionByName(regionName);
    }

    @GetMapping(URL_GET_ALL_REGIONS)
    public Iterable<Region> getAllRegions() {
        return regionService.getAllRegions();
    }

    @GetMapping(URL_GET_REGION_BY_ID)
    public Region getRegionById(@PathVariable Long id) {
        return regionService.getRegionById(id).orElse(null);
    }

    @PutMapping(URL_PUT_REGION)
    public void putRegion(@RequestBody Region region) {
        regionService.addRegion(region);
    }

    @GetMapping(URL_GET_REGION_BY_RESPONSIBLE_EMAIL)
    public Region getRegionByResponsible(@PathVariable String email) {
        return regionService.getRegionByResponsible(email).orElse(null);
    }

    @GetMapping(URL_GET_TASKS_BY_AUTHORS_EMAIL)
    public Iterable<Task> getTasksByAuthor(@PathVariable String email) {
        return taskService.getTasksByAuthorsEmail(email);
    }

    @GetMapping(URL_GET_TASK_LIST)
    public List<Task> returnTaskList() {
        List<Task> taskList = (List<Task>) taskService.findAll();
        taskList.sort((a, b) -> b.getRegDate().compareTo(a.getRegDate()));

        return taskList;
    }

    @GetMapping(URL_GET_WORKERS_BY_REGION_ID)
    public Iterable<User> getWorkerByRegionId(@PathVariable Long id) {
        return userService.getWorkerByRegionId(id);
    }

    @GetMapping(URL_GET_TASKS_BY_WORKER_ID)
    public Set<Task> getActiveTaskBySocialWorkersId(@PathVariable Long id) {
        return taskSocialWorkersService.getActiveTaskBySocialWorkersId(id);
    }

    @GetMapping(URL_GET_WORKERS_BY_TASK_ID)
    public Set<User> getSocialWorkersByActiveTaskId(@PathVariable Long id) {
        return taskSocialWorkersService.getSocialWorkersByActiveTaskId(id);
    }

    @DeleteMapping(URL_DELETE_ACTIVE_TASK_BY_TASK_ID)
    public void deleteActiveTaskByTaskId(@PathVariable Long id) {
        taskSocialWorkersService.deleteActiveTaskByTaskId(id);
    }

    @DeleteMapping(URL_DELETE_ACTIVE_TASK_BY_WORKER_ID)
    public void deleteActiveTaskByWorkerId(@PathVariable Long id) {
        taskSocialWorkersService.deleteActiveTaskByWorkerId(id);
    }

    @PostMapping(URL_POST_ACTIVE_TASK)
    public void postActiveTask(@RequestBody Long[] ids) {
        taskSocialWorkersService.addActiveTask(ids);
    }

    @DeleteMapping(URL_DELETE_COMMENT_BY_AUTHOR_ID)
    public void deleteCommentByAuthorId(@PathVariable Long id) {
        commentService.deleteCommentsByAuthorId(id);
    }

    @GetMapping(URL_GET_FEEDBACK_BY_TASK_ID)
    public Comment getFeedbackById(@PathVariable Long id) {
        return commentService.findFeedbackByTaskId(id).orElse(null);
    }

    @GetMapping(URL_GET_SUBSCRIPTION_BY_TASK_USER_IDS)
    public Subscription getSubscriptionByTaskUserIds(@PathVariable Long taskId, @PathVariable Long userId) {
        return subscriptionService.getSubscriptionByTaskUserIds(userId, taskId).orElse(null);
    }

    @PostMapping(URL_POST_SUBSCRIPTION)
    public void postSubscription(@RequestBody Subscription subscription) {
        subscriptionService.addSubscription(subscription);
    }

    @DeleteMapping(URL_DELETE_SUBSCRIPTION_BY_ID)
    public void deleteSubscriptionById(@PathVariable Long id) {
        subscriptionService.deleteSubscriptionById(id);
    }

    @DeleteMapping(URL_DELETE_SUBSCRIPTIONS_BY_USER_ID)
    public void deleteSubscriptionsByUserId(@PathVariable Long id) {
        subscriptionService.deleteSubscriptionsByUserId(id);
    }

    @GetMapping(URL_GET_DEPUTIES_BY_REGION_ID)
    public Iterable<User> getDeputyByRegionId(@PathVariable Long id) {
        return userService.getDeputyByRegionId(id);
    }

    @GetMapping(URL_GET_TASKS_BY_CURR_RESPONSIBLE_ID)
    public Iterable<Task> getTasksByCurrResponsibleId(@PathVariable Long id) {
        Iterable<Task> tasks = taskService.getAllByCurrResponsibleId(id);
        return tasks != null ? tasks : Collections.emptyList();
    }

    @PostMapping(URL_POST_HISTORY)
    public void postHistory(@RequestBody History history) {
        historyService.post(history);
    }

    @GetMapping(URL_GET_HISTORY_BY_TASK_ID)
    public Iterable<History> getHistoryByTaskId(@PathVariable Long id) {
        return historyService.getAllByTaskId(id);
    }

    @GetMapping(URL_ADD_STANDARD_MUNICIPALITY)
    public void addStandardMunicipalities() {
        municipalityService.addStandards();
    }

    @GetMapping(URL_GET_MUNICIPALITIES)
    public Iterable<Municipality> getMunicipalities() {
        return municipalityService.getAll();
    }

    @GetMapping(URL_GET_MUNICIPALITY_BY_ID)
    public Municipality getMunicipalityById(@PathVariable Long id) {
        return municipalityService.getById(id).orElse(null);
    }

    @GetMapping(URL_GET_HISTORIES_BY_PREVIOUS_CURRENT_RESPONSIBLE_ID)
    public Iterable<History> getHistoriesByPreviousCurrentResponsibleId(@PathVariable Long id) {
        return historyService.getAllByPreviousCurrentResponsibleId(id);
    }

    @DeleteMapping(URL_DELETE_HISTORY)
    public void deleteHistory(@PathVariable Long id) {
        historyService.delete(id);
    }

    @PostMapping(URL_POST_BLOCKED_TASKS)
    public void postTaskBlocked(@RequestBody String strIds) {
        blockingTasksService.add(strIds);
    }

    @PostMapping(URL_POST_DUPLICATES_TASKS)
    public void postTaskDuplicates(@RequestBody String strIds) {
        duplicateTasksService.add(strIds);
    }

    @DeleteMapping(URL_DELETE_BLOCKED_BY_ID)
    public void deleteTaskBlocked(@PathVariable Long id) {
        blockingTasksService.deleteByBlocked(id);
    }

    @DeleteMapping(URL_DELETE_DUPLICATES_BY_ID)
    public void deleteTaskDuplicates(@PathVariable Long id) {
        duplicateTasksService.deleteByDuplicate(id);
    }

    @GetMapping(URL_GET_LINKED_TASKS)
    public Iterable<Task> getLinkedTasks(@PathVariable Long id) {
        return similarTasksService.getAllLinked(id);
    }

    @GetMapping(URL_GET_ORIGIN_FROM_DUPLICATE)
    public Iterable<Task> getOriginFromDuplicate(@PathVariable Long id) {
        return duplicateTasksService.getAllOriginsByDuplicatesId(id);
    }

    @GetMapping(URL_GET_DUPLICATE_FROM_ORIGIN)
    public Iterable<Task> getDuplicateFromOrigin(@PathVariable Long id) {
        return duplicateTasksService.getAllDuplicatesByOriginId(id);
    }

    @GetMapping(URL_GET_FIRST_FROM_BLOCKED)
    public Iterable<Task> getFirstFromBlocked(@PathVariable Long id) {
        return blockingTasksService.getAllFirstByBLockedId(id);
    }

    @GetMapping(URL_GET_BLOCKED_FROM_FIRST)
    public Iterable<Task> getBlockedFromFirst(@PathVariable Long id) {
        return blockingTasksService.getAllBlockedByFirstId(id);
    }

    @DeleteMapping(URL_DELETE_LINKED_TASKS)
    public void deleteTasksById(@PathVariable Long id) {
        similarTasksService.deleteAllById(id);
    }

    @PostMapping(URL_POST_LINKED_TASKS)
    public void postLinkedTasks(@RequestBody String strIds) {
        similarTasksService.add(strIds);
    }

    @GetMapping(URL_GET_SUBSCRIPTIONS_BY_TASK_ID)
    public Iterable<Subscription> getSubscriptionsByTaskId(@PathVariable Long id) {
        return subscriptionService.getAllByTaskId(id);
    }

    @GetMapping(URL_GET_COMMENTS_BY_AUTHOR)
    public Iterable<Comment> getCommentsByAuthorId(@PathVariable Long id) {
        return commentService.findAllByAuthorId(id);
    }

    @GetMapping(URL_GET_USER_BY_URL_ACCOUNT_CONFIRM)
    public User getUserByUrlAccountConfirm(@PathVariable String url) {
        return userService.getByUrlAccountConfirm(url).orElse(null);
    }
}
