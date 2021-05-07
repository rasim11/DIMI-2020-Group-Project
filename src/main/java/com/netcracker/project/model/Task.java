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
    private Comment feedback;

    public void dataExtension(User author) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        this.regDate = dtf.format(now);
        this.author = author;
        this.status = Status.OPENED;
    }

    public void dataExtension(Task task) {
        this.taskName = task.taskName;
        this.taskDescription = task.taskDescription;
        this.taskLocation = task.taskLocation;
        this.taskImage = task.taskImage;
        this.commentAllow = task.commentAllow;
    }

    public void trim() {
        this.taskName = this.taskName.trim();
        this.taskDescription = this.taskDescription.trim();
    }

    public String dateToString(LocalDateTime localDateTime) {
        try {
            return localDateTime.format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss"));
        } catch (Exception e) {
            System.out.println("error parse  localDateTime");
            return "-";
        }
    }
}
