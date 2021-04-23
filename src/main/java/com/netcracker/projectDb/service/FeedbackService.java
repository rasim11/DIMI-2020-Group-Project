package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.Feedback;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private TaskService taskService;

    public void postFeedback(Feedback feedback) {
        feedbackRepository.save(feedback);
    }

    public Optional<Feedback> getFeedbackByTaskId(Long id) {
        Task task = taskService.getTaskById(id).orElse(null);
        return feedbackRepository.findByTask(task);
    }
}
