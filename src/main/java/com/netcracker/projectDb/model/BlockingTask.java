package com.netcracker.projectDb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "blocking_tasks",
        uniqueConstraints = @UniqueConstraint(columnNames = {"first_task_id", "blocked_id"})
)
public class BlockingTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    private Task firstTask;
    @ManyToOne
    @NotNull
    private Task blocked;
}