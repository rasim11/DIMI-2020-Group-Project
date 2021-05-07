package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.*;
import com.netcracker.projectDb.repository.DuplicateTasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;


@Transactional
@Service
public class DuplicateTasksService {
    @Autowired
    private DuplicateTasksRepository duplicateTasksRepository;
    @Autowired
    private TaskService taskService;

    public Iterable<Task> getAllDuplicatesByOriginId(Long id) // взять все дубликаты по оригиналы
    {
        Iterable<DuplicateTasks> allDuplicate = duplicateTasksRepository.findAllByOriginalId(id);
        ArrayList<Task> allDuplicateList = new ArrayList<>();
        allDuplicate.forEach((x) -> {
            allDuplicateList.add(x.getDuplicate());
        });

        if (allDuplicateList.size() != 0)
            return allDuplicateList;
        else return null;
    }

    public Iterable<Task> getAllOriginsByDuplicatesId(Long id) // взять все оригиналы по дубликату
    {
        Iterable<DuplicateTasks> allDuplicate = duplicateTasksRepository.findAllByDuplicateId(id);
        ArrayList<Task> allOriginsList = new ArrayList<>();
        allDuplicate.forEach((x) -> {
            allOriginsList.add(x.getOriginal());
        });

        if (allOriginsList.size() != 0)
            return allOriginsList;
        else return null;
    }


    public ArrayList<Task> getAllDuplicates(Task originalTask) {
        ArrayList<DuplicateTasks> allOrig = duplicateTasksRepository.findAllByOriginal(originalTask);
        ArrayList<Task> allDuplicates = null;

        if (allOrig != null) {
            allDuplicates = new ArrayList<>();

            for (DuplicateTasks elem : allOrig)
                allDuplicates.add(elem.getDuplicate());
        }
        return allDuplicates;
    }

    public void addDuplications(DuplicateTasks duplicateTasks) {
        duplicateTasksRepository.save(duplicateTasks);
    }

    public void add(String strIds) {
        long[] attr = Arrays.stream(strIds.split("&&&")).mapToLong(Long::parseLong).toArray();

        Task original = taskService.getTaskById(attr[0]).orElse(null);
        Task blocked = taskService.getTaskById(attr[1]).orElse(null);

        DuplicateTasks duplicateTasks = new DuplicateTasks(null, original, blocked);
        duplicateTasksRepository.save(duplicateTasks);
    }

    public Task getOriginal(Task duplicate) {
        Optional<DuplicateTasks> duplicateTasks = duplicateTasksRepository.findByDuplicate(duplicate);
        Task original = null;

        if (duplicateTasks.isPresent())
            original = duplicateTasks.orElse(null).getOriginal();

        return original;
    }

    public Task getOriginalByDuplicateId(Long duplicate) {
        Optional<DuplicateTasks> duplicateTasks = duplicateTasksRepository.findByDuplicateId(duplicate);

        Task optTask = null;

        if (duplicateTasks.isPresent()) {
            DuplicateTasks duplicateTasks1 = (DuplicateTasks) duplicateTasks.orElse(null);
            optTask = duplicateTasks1.getOriginal();
        }
        return optTask;
    }

    public void deleteDuplicationsById(Long id) {
        Optional<DuplicateTasks> duplicateTasks = duplicateTasksRepository.findById(id);
        duplicateTasks.ifPresent(x -> duplicateTasksRepository.delete(x));
    }

    public void deleteDuplicationsByOriginal(Task original) {
        ArrayList<DuplicateTasks> allDuplicates = duplicateTasksRepository.findAllByOriginal(original);
        if (allDuplicates != null) {
            for (DuplicateTasks elem : allDuplicates)
                duplicateTasksRepository.delete(elem);
        }
    }

    public void deleteByDuplicate(Long id) {
        System.out.println("deleteByDuplicate" + id);
        Optional<Task> duplicate = taskService.getTaskById(id);
        duplicate.ifPresent(x -> duplicateTasksRepository.deleteAllByDuplicate(x));
    }
}
