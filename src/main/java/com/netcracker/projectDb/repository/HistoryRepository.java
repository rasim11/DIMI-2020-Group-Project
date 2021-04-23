package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.History;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import org.springframework.data.repository.CrudRepository;

public interface HistoryRepository extends CrudRepository<History, Long> {
    Iterable<History> findAllByTask(Task task);

    Iterable<History> findAllByPreviousResponsibleOrCurrentResponsible(User previousResponsible,
                                                                       User currentResponsible);
}
