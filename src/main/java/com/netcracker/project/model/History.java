package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class History {
    private Long id;
    private Task task;
    private User previousResponsible;
    private User currentResponsible;
    private LocalDateTime changedDate;
}
