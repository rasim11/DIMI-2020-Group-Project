package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Status {
    IN_CREATING(0, "В обработке"), IN_PROCESSING(1, "Решаемые"),
    RESOLVED(2, "Решённые"), CANCELED(3, "Отменённые");

    private final int value;
    private final String name;
}
