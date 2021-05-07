package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.Comment;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    public void postComment(Comment comment) {
        commentRepository.save(comment);
    }

    public Iterable<Comment> getCommentsByTaskId(Long taskId) {
        Task task = taskService.getTaskById(taskId).orElse(null);
        return commentRepository.findAllByTask(task);
    }

    public void deleteCommentsByAuthorId(Long id) {
        Optional<User> author = userService.getUserById(id);
        author.ifPresent(x -> commentRepository.deleteAllByAuthor(x));
    }

    public Optional<Comment> findFeedbackByTaskId(Long id) {
        Task task = taskService.getTaskById(id).orElse(null);
        return commentRepository.findByTaskAndTag(task, "Отзыв");
    }

    public Iterable<Comment> findAllByAuthorId(Long id) {
        User author = userService.getUserById(id).orElse(null);
        return commentRepository.findAllByAuthor(author);
    }
}
