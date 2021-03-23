package com.netcracker.project.controllers.rest;

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

    @GetMapping(LOCAL_URL_GET_CURRENT_USER)
    public User getCurUser() {
        return securityService.getCurrentUser();
    }

    @PutMapping(LOCAL_URL_PUT_USER)
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

    @DeleteMapping(LOCAL_URL_DELETE_USER)
    public void deleteUser(@PathVariable String email) {
        User user = userDetailsService.getUserByEmail(email);

        userDetailsService.deleteUser(user);
    }
}
