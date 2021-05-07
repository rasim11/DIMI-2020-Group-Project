package com.netcracker.projectDb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Getter
public enum Status {
    IN_CREATING(0, "В процессе рассмотрения"),
    IN_PROCESSING(1, "В процессе устранения"),
    RESOLVED(2, "Устранена"),
    CANCELED(3, "Отменена"),
    CANCELED_AS_DUPLICATE(4, "Отменена как дубликат"),
    REJECTED(5, "Отклонена"),
    OPENED(6, "Открыта"),
    BLOCKED(7, "Заблокирована"),
    AWAITING_SOLUTION(8, "В процессе согласования");

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
