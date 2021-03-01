package com.netcracker.project.controllers;

import com.netcracker.project.model.User;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.netcracker.project.url.UrlTemplates.*;

@RestController
public class PersonalAccountRestController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping(API + VERSION + USER_MANAGEMENT + CURRENT_USER_GET)
    public User getCurUser() {
        return securityService.getCurrentUser();
    }

    @PutMapping(API + VERSION + USER_MANAGEMENT + USER_PUT)
    public String putUser(@RequestBody User userReq) {
        if (userReq.getPassword() == null) {
            User user = userDetailsService.getUserByEmail(userReq.getEmail());
            if (user != null && !user.getId().equals(userReq.getId())) {
                return "err";
            }

            user = getCurUser();
            userDetailsService.updateUserBasicData(user, userReq);

            securityService.autoLogin(userReq.getEmail(), user.getPasswordConfirm());
        } else {
            User user = getCurUser();
            userDetailsService.updateUserPass(user, userReq);

            securityService.autoLogin(user.getEmail(), userReq.getPasswordConfirm());
        }

        return "";
    }

    @DeleteMapping(API + VERSION + USER_MANAGEMENT + USER_DELETE + "/{id}")
    public void deleteUser(@PathVariable Long id) {
        userDetailsService.deleteUser(id);
    }
}
