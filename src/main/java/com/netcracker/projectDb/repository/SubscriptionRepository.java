package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.Subscription;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface SubscriptionRepository extends CrudRepository<Subscription, Long> {
//    Iterable<Subscription> findAllByUser(User user);
    Optional<Subscription> findByTaskAndUser(Task task, User user);
    void deleteAllByUser(User user);

    ArrayList<Subscription> findAllByUser(User user);
}
