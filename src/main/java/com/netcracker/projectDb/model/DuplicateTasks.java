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
@Table(name = "duplicate_tasks",
        uniqueConstraints = @UniqueConstraint(columnNames = {"original_id", "duplicate_id"})
)
public class DuplicateTasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    private Task original;
    @ManyToOne
    @NotNull
    private Task duplicate;
}