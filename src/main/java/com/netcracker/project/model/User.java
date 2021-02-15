package com.netcracker.project.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class User implements UserDetails {
    private Long id;
    private String lastname;
    private String firstname;
    private String middlename;
    private String email;
    private String phoneNumber;
    private String password;
    private String passwordConfirm;
    private Role role;
    private Date regDate;
    private Long solvedProblemsNumber;
    private Region region;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(role);
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void dataExtension(Role role){
        this.regDate = new Date();
        this.role = role;
    }
}
