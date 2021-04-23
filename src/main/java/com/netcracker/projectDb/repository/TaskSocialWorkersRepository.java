package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.TaskSocialWorkers;
import com.netcracker.projectDb.model.User;
import org.springframework.data.repository.CrudRepository;

public interface TaskSocialWorkersRepository extends CrudRepository<TaskSocialWorkers, Long> {
    Iterable<TaskSocialWorkers> findAllByActiveTask(Task activeTask);
    Iterable<TaskSocialWorkers> findAllBySocialWorker(User socialWorker);
    void deleteAllByActiveTask(Task activeTask);
    void deleteAllBySocialWorker(User socialWorker);
}
