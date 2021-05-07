package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.Subscription;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Transactional
@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    public Optional<Subscription> getSubscriptionByTaskUserIds(Long userId, Long taskId) {
        User user = userService.getUserById(userId).orElse(null);
        Task task = taskService.getTaskById(taskId).orElse(null);

        return subscriptionRepository.findByTaskAndUser(task, user);
    }

    public void addSubscription(Subscription subscription) {
        subscriptionRepository.save(subscription);
    }

    public void deleteSubscriptionById(Long id) {
        Optional<Subscription> subscription = subscriptionRepository.findById(id);
        subscription.ifPresent(x -> subscriptionRepository.delete(x));
    }

    public void deleteSubscriptionsByUserId(Long id) {
        Optional<User> user = userService.getUserById(id);
        user.ifPresent(x -> subscriptionRepository.deleteAllByUser(x));
    }

    public ArrayList<Subscription> findAllByUser(User user) {
        return subscriptionRepository.findAllByUser(user);
    }

    public Iterable<Subscription> getAllByTaskId(Long id) {
        Task task = taskService.getTaskById(id).orElse(null);
        return subscriptionRepository.findAllByTask(task);
    }
}
