package com.netcracker.project.model;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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
    private User responsible;
    private User socWorker;
    private String regDate;
    private Status progressStatus;
    private String completeDate;
    private Feedback feedBack;

    private TaskStatus taskStatus;

    public void dataExtension(User author) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        this.regDate = dtf.format(now) ;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
