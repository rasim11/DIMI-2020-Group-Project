package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.BlockingTask;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.repository.BlockingTasksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;


@Transactional
@Service
public class BlockingTasksService {
    @Autowired
    private BlockingTasksRepository blockingTasksRepository;

    public ArrayList<Task> getAllBlocked(Task first)  // все заблокированные проблемы, проблемой first
    {
        Iterable<BlockingTask> allBlocked = blockingTasksRepository.findAllByFirstTask(first);
        ArrayList<Task> allBl = new ArrayList<>();
        allBlocked.forEach((x) -> {
            allBl.add(x.getBlocked());
        });
        return allBl;
    }

    public Iterable<Task> getAllFirstByBLockedId(Long id) // берет все задачи, котрые блокируют
    {
        Iterable<BlockingTask>  allWithBlocked =  blockingTasksRepository.findAllByBlocked_Id(id);

        ArrayList<Task> allFirst = new ArrayList<>();
        allWithBlocked.forEach( (x) -> { allFirst.add(x.getFirstTask()); } );

        return allFirst;
    }

    public void addBlocking(BlockingTask blockingTask) {
            blockingTasksRepository.save(blockingTask);
        }

        public Iterable<Task> getFirst(Task blockedTask)
        {
            Iterable<BlockingTask> firstTasks = blockingTasksRepository.findAllByBlocked(blockedTask);

            ArrayList<Task> arrayList = new ArrayList<>();

            firstTasks.forEach((x) -> {
                arrayList.add(x.getFirstTask());
            });

            return arrayList;
        }

        public void deleteFirstTasks(Task firsTask)
        {
          Iterable<BlockingTask> allFirstTasks =  blockingTasksRepository.findAllByFirstTask(firsTask);
            allFirstTasks.forEach( (x) -> {blockingTasksRepository.delete(x);});
        }

        public void deleteBlockingTaskById(Long id)
        {
            blockingTasksRepository.deleteById(id);
        }

}
