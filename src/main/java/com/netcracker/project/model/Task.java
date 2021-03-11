package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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
    private User responsible;
    private User socWorker;
    private LocalDate regDate;
    private Status progressStatus;
    private LocalDate completeDate;
    private Feedback feedBack;

    public void dataExtension(User author) {
        this.regDate = LocalDate.now();
        this.author = author;
    }
}
