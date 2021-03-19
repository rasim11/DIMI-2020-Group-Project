package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment {

    private Long id;
    private Task task;
    private String comment;
    private LocalDateTime publishDate;
    private User author;
}
