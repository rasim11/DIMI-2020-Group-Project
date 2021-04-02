package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Getter
public enum Status {
    IN_CREATING(0, "В обработке"), IN_PROCESSING(1, "Решаемые"),
    RESOLVED(2, "Решённые"), CANCELED(3, "Отменённые");

    private final int value;
    private final String name;
    private static final Map<Integer, Status> map = new HashMap<>();

    static {
        for (Status status : Status.values()) {
            map.put(status.value, status);
        }
    }

    public static Status valueOf(int pageType) {
        return map.get(pageType);
    }
}
