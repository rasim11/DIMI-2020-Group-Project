package com.netcracker.projectDb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(columnDefinition = "text")
    private String taskName;
    @NotNull
    @Column(columnDefinition = "text")
    private String taskDescription;
    @NotNull
    @Column(columnDefinition = "text")
    private String taskLocation;
    @NotNull
    private Boolean commentAllow;
    @Lob
    @Null
    private String taskImage;
    @ManyToOne
    @Null
    private User author;
    @ManyToOne
    @Null
    private User currResponsible;
    @ManyToOne
    @NotNull
    private Region region;
    @NotNull
    private String regDate;
    @Null
    private LocalDateTime completeDate;
    @Enumerated(EnumType.ORDINAL)
    private Status status;
    @Enumerated(EnumType.ORDINAL)
    private Priority priority;

}
