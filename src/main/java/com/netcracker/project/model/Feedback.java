package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Feedback {
    private Long id;
    private String feedback;
    private LocalDateTime publishDate;
    private Task task;

    public void dataExtension(Task task, String feedback) {
        this.task = task;
        this.publishDate = LocalDateTime.now();
        this.feedback = feedback.trim();
    }
}
