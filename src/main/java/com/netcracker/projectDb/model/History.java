package com.netcracker.projectDb.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Task task;
    @ManyToOne
    private User previousResponsible;
    @ManyToOne
    private User currentResponsible;
    private LocalDateTime changedDate;
}
