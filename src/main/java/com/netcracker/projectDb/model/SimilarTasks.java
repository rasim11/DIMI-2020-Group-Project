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
@Table(name = "similar_tasks",
        uniqueConstraints = @UniqueConstraint(columnNames = {"original_id", "similar_id"})
)
public class SimilarTasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    private Task original;
    @ManyToOne
    @NotNull
    private Task similar;
}