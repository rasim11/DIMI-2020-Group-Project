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
    private Boolean commentAllow;
    private String taskImage;
    private User author;
    private Region region;
    private String regDate;
    private LocalDateTime completeDate;
    private Status status;
    private Set<User> socialWorkers;
    private User currResponsible;
    private Feedback feedback;

    public void dataExtension(User author) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        this.regDate = dtf.format(now);
        this.author = author;
        this.status = Status.IN_CREATING;
    }

    public void dataExtension(Task task) {
        this.taskName = task.taskName;
        this.taskDescription = task.taskDescription;
        this.taskLocation = task.taskLocation;
        this.taskImage = task.taskImage;
    }

    public void dataExtension(Status status, Priority priority) {
        this.status = status;
        this.priority = priority;
        this.completeDate = status.equals(Status.RESOLVED) ? LocalDateTime.now() : null;
    }

    public void trim() {
        this.taskName = this.taskName.trim();
        this.taskDescription = this.taskDescription.trim();
    }

    public String dateToString(LocalDateTime localDateTime) {
        return localDateTime.format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm"));
    }
}
