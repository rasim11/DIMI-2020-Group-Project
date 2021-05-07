package com.netcracker.projectDb.repository;


import com.netcracker.projectDb.model.SimilarTasks;
import com.netcracker.projectDb.model.Task;
import org.springframework.data.repository.CrudRepository;


public interface SimilarTasksRepository extends CrudRepository<SimilarTasks, Long> {

    Iterable<SimilarTasks> findAllByOriginalId(Long id); // для поиска всех оригиналов
    Iterable<SimilarTasks> findAllBySimilarId(Long id); // для поиска всех похожих

    void deleteAllByOriginal(Task duplicate);
    void deleteAllBySimilar(Task similar);
}
