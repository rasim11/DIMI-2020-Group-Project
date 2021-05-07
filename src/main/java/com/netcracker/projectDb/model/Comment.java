package com.netcracker.projectDb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @NotNull
    private Task task;
    @Column(columnDefinition = "text")
    @NotNull
    private String comment;
    @NotNull
    private LocalDateTime publishDate;
    @ManyToOne
    @Null
    private User author;
    @Null
    private String tag;
}
