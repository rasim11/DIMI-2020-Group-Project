package com.netcracker.project.model;

import java.util.HashMap;
import java.util.Map;

public enum TaskStatus {
    IN_CREATING(0), IN_PROCESSING(1), RESOLVED(2), CANCELED(3) ;

    private int value;
    private static Map map = new HashMap<>();

    private TaskStatus(int value) {
        this.value = value;
    }

    static {
        for (TaskStatus taskStatus : TaskStatus.values()) {
            map.put(taskStatus.value, taskStatus);
        }
    }

    public static TaskStatus valueOf(int pageType) {
        return (TaskStatus) map.get(pageType);
    }

    public int getValue() {
        return value;
    }
}
