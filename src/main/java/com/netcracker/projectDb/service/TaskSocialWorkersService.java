package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.TaskSocialWorkers;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.TaskSocialWorkersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Transactional
@Service
public class TaskSocialWorkersService {
    @Autowired
    private TaskSocialWorkersRepository taskSocialWorkersRepository;
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    public Iterable<TaskSocialWorkers> getAllByActiveTask(Task activeTask) {
        return taskSocialWorkersRepository.findAllByActiveTask(activeTask);
    }

    public Iterable<TaskSocialWorkers> getAllBySocialWorker(User socialWorker) {
        return taskSocialWorkersRepository.findAllBySocialWorker(socialWorker);
    }

    public Set<User> getSocialWorkersByActiveTaskId(Long id) {
        Task activeTask = taskService.getTaskById(id).orElse(null);
        Iterable<TaskSocialWorkers> taskSocialWorkers = getAllByActiveTask(activeTask);

        Set<User> socialWorkers = new HashSet<>();
        for (TaskSocialWorkers element : taskSocialWorkers) {
            socialWorkers.add(element.getSocialWorker());
        }

        return socialWorkers;
    }

    public Set<Task> getActiveTaskBySocialWorkersId(Long id) {
        User socialWorker = userService.getUserById(id).orElse(null);
        Iterable<TaskSocialWorkers> taskSocialWorkers = getAllBySocialWorker(socialWorker);

        Set<Task> activeTasks = new HashSet<>();
        for (TaskSocialWorkers element : taskSocialWorkers) {
            activeTasks.add(element.getActiveTask());
        }

        return activeTasks;
    }

    public void addTaskSocialWorkers(TaskSocialWorkers taskSocialWorkers) {
        taskSocialWorkersRepository.save(taskSocialWorkers);
    }

    public void addActiveTask(Long[] ids) {
        Task activeTask = taskService.getTaskById(ids[0]).orElse(null);
        User socialWorker = userService.getUserById(ids[1]).orElse(null);

        TaskSocialWorkers taskSocialWorkers = new TaskSocialWorkers(null, activeTask, socialWorker);
        addTaskSocialWorkers(taskSocialWorkers);
    }

    public void deleteActiveTaskByTaskId(Long id) {
        Optional<Task> activeTask = taskService.getTaskById(id);
        activeTask.ifPresent(x -> taskSocialWorkersRepository.deleteAllByActiveTask(x));
    }

    public void deleteActiveTaskByWorkerId(Long id) {
        Optional<User> socialWorker = userService.getUserById(id);
        socialWorker.ifPresent(x -> taskSocialWorkersRepository.deleteAllBySocialWorker(x));
    }
}
