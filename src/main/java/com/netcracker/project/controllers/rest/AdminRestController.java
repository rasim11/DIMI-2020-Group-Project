package com.netcracker.project.controllers.rest;

import com.netcracker.project.model.Region;
import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.netcracker.project.url.UrlTemplates.*;

@RestController
public class AdminRestController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private EntityService entityService;

    @GetMapping(LOCAL_URL_GET_ALL_USERS )
    public Iterable<User> getAllUsers() {
        Iterable<User> users = userDetailsService.getAllUsers();
        for (User user : users) {
            user.setPassword(null);
        }
        return userDetailsService.getAllUsers();
    }

    @GetMapping(LOCAL_URL_GET_ALL_ROLES)
    public Iterable<Role> getAllRoles() {
        return entityService.getAllObjects(URL_GET_ALL_ROLES);
    }

    @GetMapping(LOCAL_URL_GET_ALL_REGIONS)
    public Iterable<Region> getAllRegions() {
        return entityService.getAllObjects(URL_GET_ALL_REGIONS);
    }

    @PostMapping(LOCAL_URL_CHECK_EMAIL_FREE)
    public Boolean isEmailFree(@RequestBody String email) {
        User user = userDetailsService.getUserByEmail(email);
        return user == null;
    }
}
