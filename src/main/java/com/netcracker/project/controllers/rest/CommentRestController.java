package com.netcracker.project.controllers.rest;

import com.netcracker.project.model.Comment;
import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import static com.netcracker.project.url.UrlTemplates.LOCAL_URL_GET_COMMENT_BY_TASK_ID;
import static com.netcracker.project.url.UrlTemplates.LOCAL_URL_POST_COMMENT;

@RestController
public class CommentRestController {
    @Autowired
    private EntityService entityService;
    @Autowired
    private SecurityService securityService;

    @PostMapping(LOCAL_URL_POST_COMMENT)
    public void addComment(@RequestBody String commentStr) {
        String[] commentBody = commentStr.split("&&&");
        Task task = entityService.getTaskById(Long.parseLong(commentBody[1]));
        User curUser = securityService.getCurrentUser();

        Comment comment = new Comment(null, task, commentBody[0], LocalDateTime.now(), curUser);
        entityService.postComment(comment);
    }

    @GetMapping(LOCAL_URL_GET_COMMENT_BY_TASK_ID)
    public Iterable<Comment> getComment(@PathVariable Long id) {
        return entityService.getCommentByTaskId(id);
    }
}
