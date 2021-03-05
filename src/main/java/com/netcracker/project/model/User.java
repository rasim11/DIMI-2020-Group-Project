package com.netcracker.project.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class User implements UserDetails {
    private Long id;
    private String lastname;
    private String firstname;
    private String middlename;
    private String userImage;
    private String email;
    private String phoneNumber;
    private String password;
    private String passwordConfirm;
    private Role role;
    private LocalDate regDate;
    private Long tasksCount;
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

    public void dataExtension(Role role) {
        this.regDate = LocalDate.now();
        this.tasksCount = 0L;
        this.role = role;
    }

    public void update(User user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.middlename = user.middlename;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
    }

    public String dateToString(LocalDate localDate){
        return localDate.format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    }
}
