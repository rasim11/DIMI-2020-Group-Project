package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
@Getter
public enum Role implements GrantedAuthority {
    USER("Пользователь"), SOCIAL_WORKER("Соц. работник"),
    RESPONSIBLE("Региональный ответственный"), ADMIN("Админ"),DEPUTY("Ответственный");

    private final String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
