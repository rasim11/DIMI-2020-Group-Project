package com.netcracker.projectDb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Priority {
    CRITICAL("Критический"), HIGH("Высокий"),
    MEDIUM("Средний"), LOW( "Низкий");

    private final String name;
}
