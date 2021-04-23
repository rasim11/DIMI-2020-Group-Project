package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.History;
import com.netcracker.projectDb.model.Task;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    public void post(History history) {
        historyRepository.save(history);
    }

    public Iterable<History> getAllByTaskId(Long id) {
        Task task = taskService.getTaskById(id).orElse(null);
        return historyRepository.findAllByTask(task);
    }

    public Iterable<History> getAllByPreviousCurrentResponsibleId(Long id) {
        User user = userService.getUserById(id).orElse(null);
        return historyRepository.findAllByPreviousResponsibleOrCurrentResponsible(user, user);
    }

    public void delete(Long id) {
        Optional<History> history = historyRepository.findById(id);
        history.ifPresent(value -> historyRepository.delete(value));
    }
}
