package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.DuplicateTasks;
import com.netcracker.projectDb.model.Subscription;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.DuplicateTasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;


@Transactional
@Service
public class DuplicateTasksService {
    @Autowired
    private DuplicateTasksRepository duplicateTasksRepository;

    public ArrayList<Task> getAllDuplicates(Task originalTask)
    {
        ArrayList<DuplicateTasks> allOrig =  duplicateTasksRepository.findAllByOriginal(originalTask);
        ArrayList<Task> allDuplicates  = null;

       if (allOrig != null)
       {
           allDuplicates =  new ArrayList<>();

           for (DuplicateTasks elem : allOrig)
               allDuplicates.add(elem.getDuplicate());
       }
      return allDuplicates;
    }


    public void addDuplications(DuplicateTasks duplicateTasks)
    {
        duplicateTasksRepository.save(duplicateTasks);
    }

    public Task getOriginal(Task duplicate)
    {
      Optional<DuplicateTasks> duplicateTasks =  duplicateTasksRepository.findByDuplicate(duplicate);
      Task original = null;

      if (duplicateTasks.isPresent())
          original = duplicateTasks.orElse(null).getOriginal();

        return original;
    }

    public Task getOriginalByDuplicateId(Long duplicate)
    {
        Optional<DuplicateTasks> duplicateTasks =  duplicateTasksRepository.findByDuplicateId(duplicate);

        Task optTask = null;

        if (duplicateTasks.isPresent()) {
            DuplicateTasks duplicateTasks1 = (DuplicateTasks)duplicateTasks.orElse(null);
            optTask = duplicateTasks1.getOriginal();
        }
        return optTask;
    }

    public void deleteDuplicationsById(Long id)
    {
        Optional<DuplicateTasks> duplicateTasks =  duplicateTasksRepository.findById(id);
        duplicateTasks.ifPresent( x -> duplicateTasksRepository.delete(x));
    }

    public void deleteDuplicationsByOriginal(Task original)
    {
       ArrayList<DuplicateTasks> allDuplicates =  duplicateTasksRepository.findAllByOriginal(original);
       if (allDuplicates != null)
       {
           for (DuplicateTasks elem : allDuplicates)
               duplicateTasksRepository.delete(elem);
       }
    }

}
