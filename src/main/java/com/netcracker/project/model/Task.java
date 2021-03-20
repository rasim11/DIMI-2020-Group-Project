package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Task {
    private Long id;
    private String taskName;
    private String taskDescription;
    private String taskLocation;
    private Priority priority;
    private boolean commentAllow;
    private String taskImage;
    private User author;
    private Region region;
    private String regDate;
    private LocalDateTime completeDate;
    private Status status;
    private Set<User> socialWorkers;

    public void dataExtension(User author) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        this.regDate = dtf.format(now);
        this.author = author;
        this.author.setTasksCount(this.author.getTasksCount() + 1);
        this.status = Status.IN_CREATING;
    }

    public void dataExtension(Status status, Priority priority) {
        this.status = status;
        this.priority = priority;
        this.completeDate = status.equals(Status.RESOLVED) ? LocalDateTime.now() : null;
    }
}
