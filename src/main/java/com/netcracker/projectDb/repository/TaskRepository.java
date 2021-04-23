package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.Status;
import com.netcracker.projectDb.model.User;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
    Iterable<Task> findAllByTaskName(String var1);

    Iterable<Task> findAllByStatus(Status status);

    Iterable<Task> findAllByAuthor(User author);

    Iterable<Task> findAllByCurrResponsible(User currResponsible);
}
