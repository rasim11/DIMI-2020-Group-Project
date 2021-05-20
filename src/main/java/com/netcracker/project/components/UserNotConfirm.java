package com.netcracker.project.components;

import com.netcracker.project.model.User;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import static com.netcracker.project.controllers.rest.PersonalAccountRestController.TIME_BEFORE_ACCOUNT_DELETION;

@Component
public class UserNotConfirm {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Async
    @EventListener(ApplicationReadyEvent.class)
    public void deleteNotConfirmAccount() {
        Iterable<User> users = userDetailsService.getAllUsers();

        for (User user : users) {
            if (user.getIsAccountConfirmed()) {
                continue;
            }

            deleteUserWithTime(user);
        }
    }

    @Async
    public void deleteUserWithTime(User user) {
        if (!user.getIsAccountConfirmed()) {
            long dif = Math.abs(ChronoUnit.MILLIS.between(user.getRegDate(), LocalDateTime.now()));

            User userDb = userDetailsService.getUserById(user.getId());
            if (dif <= TIME_BEFORE_ACCOUNT_DELETION && userDb != null) {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println(e.getMessage());
                }
                deleteUserWithTime(user);
            } else if (userDb != null) {
                userDetailsService.deleteUser(userDb);
            }
        }
    }
}
