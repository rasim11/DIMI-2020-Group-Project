package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.Feedback;
import com.netcracker.projectDb.model.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FeedbackRepository extends CrudRepository<Feedback, Long> {
    Optional<Feedback> findByTask(Task task);
}
