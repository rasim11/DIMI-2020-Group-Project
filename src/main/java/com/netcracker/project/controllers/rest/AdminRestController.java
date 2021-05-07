package com.netcracker.project.controllers.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

import static com.netcracker.project.url.UrlTemplates.*;
import static java.util.stream.Collectors.toList;

@RestController
public class AdminRestController {
    public static String geoLocation;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private EntityService entityService;

    @GetMapping(LOCAL_URL_GET_ALL_USERS)
    public Iterable<User> getAllUsers() {
        Iterable<User> users = userDetailsService.getAllUsers();
        for (User user : users) {
            user.setPassword(null);
        }
        return userDetailsService.getAllUsers();
    }

    @GetMapping(LOCAL_URL_GET_ALL_ROLES)
    public List<Role> getAllRoles() {
        List<Role> roles = Arrays.stream(Role.values()).collect(toList());
        roles.remove(Role.ADMIN);
        return roles;
    }

    @GetMapping(LOCAL_URL_GET_ALL_REGIONS)
    public JsonNode getAllRegions() {
        return entityService.getAllObjects(URL_GET_ALL_REGIONS);
    }

    @PostMapping(LOCAL_URL_CHECK_EMAIL_FREE)
    public Boolean isEmailFree(@RequestBody String email) {
        User user = userDetailsService.getUserByEmail(email);
        return user == null;
    }

    @GetMapping(LOCAL_URL_GET_MUNICIPALITIES)
    public JsonNode getMunicipalities() {
        return entityService.getAllObjects(URL_GET_MUNICIPALITIES);
    }

    @PostMapping(LOCAL_URL_POST_GEOLOCATION)
    public void setGeoLocation(@RequestBody String geoLocation) {
        AdminRestController.geoLocation = geoLocation;
    }
}
