package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.DuplicateTasks;
import com.netcracker.projectDb.model.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.Optional;


public interface DuplicateTasksRepository extends CrudRepository<DuplicateTasks, Long> {
    ArrayList<DuplicateTasks> findAllByOriginal(Task task);
    Optional<DuplicateTasks> findByDuplicate(Task task);
    Optional<DuplicateTasks> findByDuplicateId(Long id);
    Iterable<DuplicateTasks> findAllByOriginalId(Long id); // для поиска всех дубликатов
    Iterable<DuplicateTasks> findAllByDuplicateId(Long id);      // для поиска всех оригиналов

    void deleteAllByDuplicate(Task duplicate);
}
