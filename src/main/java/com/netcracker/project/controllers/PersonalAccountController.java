package com.netcracker.project.controllers;

import com.netcracker.project.model.User;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class PersonalAccountController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping(API + VERSION + PERSONAL_ACCOUNT)
    public String personalAccountGet(Model model) {
        return "personal-account";
    }

    @GetMapping(API + VERSION + USER_MANAGEMENT + USER_GET + "/id{id}")
    public String showProfile(@PathVariable Long id, Model model) {
        if (!securityService.isAuthenticated()) {
            model.addAttribute("msgErr", "Профили может просматривать только зарегистрированный пользователь!");
            return "profile";
        }

        User user = userDetailsService.getUserById(id);
        if (user == null) {
            return REDIRECT_ON_MAIN_PAGE;
        }

        return "profile";
    }
}
