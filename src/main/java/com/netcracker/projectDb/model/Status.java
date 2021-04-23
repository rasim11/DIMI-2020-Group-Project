package com.netcracker.projectDb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Getter
public enum Status {
    IN_CREATING(0, "В обработке"),
    IN_PROCESSING(1, "Решается"),
    RESOLVED(2, "Решена"),
    CANCELED(3, "Отменена"),

    CANCELED_AS_DUBLICATE(4, "Отменена как дубликат"),
    REJECTED(5, "Отклонена"),
    OPENED(6, "Открыта"),
    BLOCKED(7, "Заблокирована"),
    AWAITING_SOLUTION(8, "Ожидает решения"),
    IN_THE_PROCESS_OF_FIXING(9, "В процессе устранения");
    //    ACCEPTED_FOR_PROCESSING(5, "Принята в обработку"),


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
