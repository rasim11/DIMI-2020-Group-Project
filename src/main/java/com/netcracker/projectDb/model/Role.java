package com.netcracker.projectDb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
    USER("Пользователь"), SOCIAL_WORKER("Соц. работник"),
    RESPONSIBLE("Региональный ответственный"), ADMIN("Админ"),DEPUTY("Ответственный");

    private final String name;
}