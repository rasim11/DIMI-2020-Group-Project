package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Role implements GrantedAuthority {
    private Long id;
    private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
