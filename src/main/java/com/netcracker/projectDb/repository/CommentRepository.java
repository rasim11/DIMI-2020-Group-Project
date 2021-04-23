package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.Comment;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment,Long> {
    Iterable<Comment>findAllByTask(Task task);
    void deleteAllByAuthor(User author);
}
