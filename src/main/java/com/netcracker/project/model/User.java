package com.netcracker.project.model;

import com.netcracker.project.service.EntityService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.UUID;

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
    private String appointment;
    private Role role;
    private LocalDateTime regDate;
    private Long tasksCount;
    private Region region;
    private Municipality municipality;
    private Set<Task> activeTasks;
    private Boolean isAccountConfirmed;
    private String urlAccountConfirm;

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

    public void createUrlAccountConfirm() {
        this.isAccountConfirmed = false;
        this.urlAccountConfirm = UUID.randomUUID().toString();
    }

    public void dataExtension(Role role) {
        this.regDate = LocalDateTime.now();
        this.tasksCount = 0L;
        this.role = role;
        this.createUrlAccountConfirm();
    }

    public void dataExtension(Role role, Region region) {
        this.dataExtension(role);
        this.region = region;
        this.createUrlAccountConfirm();
    }

    public void update(User user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.middlename = user.middlename;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.userImage = user.userImage;
    }

    public String dateToString(LocalDate localDate) {
        return localDate.format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    }

    public Long calculateActiveTask() {
        long count = 0;
        if (activeTasks == null) {
            return count;
        }

        for (Task task : activeTasks) {
            if (!(task.getStatus().equals(Status.CANCELED) || task.getStatus().equals(Status.RESOLVED) ||
                    task.getStatus().equals(Status.REJECTED) ||
                    task.getStatus().equals(Status.CANCELED_AS_DUPLICATE))) {
                count++;
            }
        }
        return count;
    }
}
