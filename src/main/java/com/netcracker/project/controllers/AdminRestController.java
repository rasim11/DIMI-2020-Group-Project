package com.netcracker.project.controllers;

import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.netcracker.project.url.UrlTemplates.*;

@RestController
public class AdminRestController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private EntityService entityService;

    @GetMapping(value = API + VERSION + USER_MANAGEMENT + ALL_USERS_GET)
    public Iterable<User> getAllUsers() {
        return userDetailsService.getAllUsers();
    }

    @GetMapping(value = API + VERSION + ROLE_MANAGEMENT + ALL_ROLES_GET)
    public Iterable<Role> getAllRoles() {
        return entityService.getAllRoles();
    }
}
