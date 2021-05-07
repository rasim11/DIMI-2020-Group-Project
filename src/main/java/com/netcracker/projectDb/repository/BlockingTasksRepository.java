package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.BlockingTask;
import com.netcracker.projectDb.model.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface BlockingTasksRepository extends CrudRepository<BlockingTask, Long> {
    Iterable<BlockingTask> findAllByFirstTask(Task task);
    Iterable<BlockingTask> findAllByBlocked(Task task);

    Iterable<BlockingTask> findAllByBlocked_Id(Long id);
    Iterable<BlockingTask> findAllByFirstTaskId(Long id);
    Optional<BlockingTask> findById(Long id);

    void deleteAllByBlocked(Task blocked);
}