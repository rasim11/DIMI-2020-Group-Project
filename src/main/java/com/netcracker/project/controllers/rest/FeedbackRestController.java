package com.netcracker.project.controllers.rest;

import com.netcracker.project.model.Feedback;
import com.netcracker.project.model.Status;
import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

import static com.netcracker.project.url.UrlTemplates.LOCAL_URL_POST_FEEDBACK;

@RestController
public class FeedbackRestController {
    @Autowired
    private EntityService entityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping(LOCAL_URL_POST_FEEDBACK)
    public void postFeedback(@RequestBody String feedbackStr) {
        String[] feedbackBody = feedbackStr.split("&&&");
        Task task = entityService.getTaskById(Long.parseLong(feedbackBody[1]));
        if (feedbackBody[2].equals("3")) {
            User author = task.getAuthor();
            author.setTasksCount(author.getTasksCount() - 1);
            userDetailsService.putUser(author);

            task.setStatus(Status.CANCELED);
            task.setCompleteDate(LocalDateTime.now());
            entityService.putTask(task);
        }

        Feedback feedback = new Feedback();
        feedback.dataExtension(task, feedbackBody[0]);
        entityService.postFeedback(feedback);
    }
}
