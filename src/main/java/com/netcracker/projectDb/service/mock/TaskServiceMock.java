package com.netcracker.projectDb.service.mock;

import com.netcracker.projectDb.model.Status;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.TaskRepository;
import com.netcracker.projectDb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
@Profile("test")
@Transactional
@Service
public class TaskServiceMock {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserService userService;

    public void addTask(Task task) {
        taskRepository.save(task);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Iterable<Task> getTasksByAuthorsEmail(String email) {
        User author = userService.getUserByEmail(email).orElse(null);
        return taskRepository.findAllByAuthor(author);
    }

    public Iterable<Task> findAll() {
        return taskRepository.findAll();
    }

    public Iterable<Task> findAllByTaskName(String taskName) {
        return taskRepository.findAllByTaskName(taskName);
    }

    public Iterable<Task> findAllByStatus(Status status) {
        return taskRepository.findAllByStatus(status);
    }

    public Iterable<Task> findAllByAuthor(User author)
    {
        return taskRepository.findAllByAuthor(author);
    }
    public Iterable<Task> getAllByCurrResponsibleId(Long id)
    {
        User user = userService.getUserById(id).orElse(null);
        return taskRepository.findAllByCurrResponsible(user);
    }

}
