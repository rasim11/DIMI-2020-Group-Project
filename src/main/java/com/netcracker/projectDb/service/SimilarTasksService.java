package com.netcracker.projectDb.service;


import com.netcracker.projectDb.model.BlockingTask;
import com.netcracker.projectDb.model.SimilarTasks;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.repository.SimilarTasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

@Transactional
@Service
public class SimilarTasksService {

    @Autowired
    private SimilarTasksRepository similarTasksRepository;
    @Autowired
    private TaskService taskService;

    public Iterable<Task> getAllSimilarByOriginalId(Long id) // взять все походие по оригиналу
    {
        Iterable<SimilarTasks> allDuplicate = similarTasksRepository.findAllByOriginalId(id);
        ArrayList<Task> allSimilarList = new ArrayList<>();
        allDuplicate.forEach((x) -> {
            allSimilarList.add(x.getSimilar());
        });

        if (allSimilarList.size() != 0)
            return allSimilarList;
        else return null;
    }

    public Iterable<Task> getAllOriginsBySimilarId(Long id) // взять все оригиналы по similar
    {
        Iterable<SimilarTasks> allSimilar = similarTasksRepository.findAllBySimilarId(id);
        ArrayList<Task> allOriginsList = new ArrayList<>();
        allSimilar.forEach((x) -> {
            allOriginsList.add(x.getOriginal());
        });

        if (allOriginsList.size() != 0)
            return allOriginsList;
        else return null;
    }

    public Iterable<Task> getAllLinked(Long id) {
        ArrayList<Task> allLinked = new ArrayList<>();

        Iterable<Task> allSimilar = getAllSimilarByOriginalId(id);
        Iterable<Task> allOrigin = getAllOriginsBySimilarId(id);

        if (allSimilar != null)
            allSimilar.forEach(allLinked::add);

        if (allOrigin != null)
            allOrigin.forEach((x) -> {
                if (!allLinked.contains(x)) {
                    allLinked.add(x);
                }
            });

        if (!allLinked.isEmpty()) {
            return allLinked;
        } else return null;
    }

    public void deleteByOriginId(Long id) {
        Optional<Task> origin = taskService.getTaskById(id);
        origin.ifPresent(x -> similarTasksRepository.deleteAllByOriginal(x));
    }

    public void deleteBySimilarId(Long id) {
        Optional<Task> similar = taskService.getTaskById(id);
        similar.ifPresent(x -> similarTasksRepository.deleteAllBySimilar(x));
    }

    public void deleteAllById(Long id) {
        deleteByOriginId(id);
        deleteBySimilarId(id);
    }

    public void add(String strIds) {
        long[] attr = Arrays.stream(strIds.split("&&&")).mapToLong(Long::parseLong).toArray();

        Task original = taskService.getTaskById(attr[1]).orElse(null);
        Task similar = taskService.getTaskById(attr[0]).orElse(null);

        SimilarTasks similarTasks = new SimilarTasks(null, original, similar);
        similarTasksRepository.save(similarTasks);
    }
}
