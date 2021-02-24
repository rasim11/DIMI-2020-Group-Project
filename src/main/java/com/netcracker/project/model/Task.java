package com.netcracker.project.model;

import lombok.Data;

import java.time.LocalDate;
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
    private User author;
    private User responsible;
    private User socWorker;
    private String regDate;
    private Status progressStatus;
    private String completeDate;
    private Feedback feedBack;

    public void dataExtension(User author) {
        this.regDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
        this.author = author;
    }
}
