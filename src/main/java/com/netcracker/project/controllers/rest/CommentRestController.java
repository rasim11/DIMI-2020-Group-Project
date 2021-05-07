package com.netcracker.project.controllers.rest;

import com.netcracker.project.model.Comment;
import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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

        Comment comment = new Comment(null, task, commentBody[0].trim(), LocalDateTime.now(),
                curUser, commentBody.length >= 3 ? commentBody[2] : null);
        entityService.postComment(comment);
    }

    @GetMapping(LOCAL_URL_GET_COMMENT_BY_TASK_ID)
    public List<Comment> getComment(@PathVariable Long id) {
        return StreamSupport.stream(entityService.getCommentByTaskId(id).spliterator(), false).
                sorted((a,b)->b.getPublishDate().compareTo(a.getPublishDate()))
                .collect(Collectors.toList());
    }
}
