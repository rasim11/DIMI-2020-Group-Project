package com.netcracker.projectDb.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.projectDb.components.Standard;
import com.netcracker.projectDb.model.Region;
import com.netcracker.projectDb.model.Status;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import static com.netcracker.projectDb.url.FilePaths.PATH_STANDARD_TASKS;

@Transactional
@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private RegionService regionService;

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

    public Iterable<Task> findAllByAuthor(User author) {
        return taskRepository.findAllByAuthor(author);
    }

    public Iterable<Task> getAllByCurrResponsibleId(Long id) {
        User user = userService.getUserById(id).orElse(null);
        return user != null ? taskRepository.findAllByCurrResponsible(user) : null;
    }

    public void addStandard() {
        ObjectMapper mapper = new ObjectMapper();
        Iterable<Task> tasks = mapper.convertValue(Standard.getStandardObjects(PATH_STANDARD_TASKS),
                new TypeReference<Iterable<Task>>() {
                }
        );

        int i = 0;
        for (Task task : tasks) {
            User author;
            if (i < 3) {
                author = userService.getUserByEmail("user1@mail.ru").orElse(null);
            } else {
                author = userService.getUserByEmail("user2@mail.ru").orElse(null);
            }
            task.setAuthor(author);

            Region region = regionService.getRegionByName("Самарская область");
            task.setRegion(region);
            task.setCurrResponsible(region.getResponsible());

            task.setRegDate(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss").format(LocalDateTime.now()));
            task.setStatus(Status.OPENED);
            task.setTaskImage("");

            addTask(task);

            i++;
        }
    }
}
