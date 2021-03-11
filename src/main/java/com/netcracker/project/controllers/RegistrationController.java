package com.netcracker.project.controllers;

import com.netcracker.project.model.User;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import static com.netcracker.project.url.UrlTemplates.LOCAL_URL_USER_REGISTRATION;
import static com.netcracker.project.url.UrlTemplates.REDIRECT_ON_MAIN_PAGE;

@Controller
public class RegistrationController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping(LOCAL_URL_USER_REGISTRATION)
    public String registrationGet(Model model) {
        model.addAttribute("userForm", new User());
        return "registration";
    }

    @PostMapping(LOCAL_URL_USER_REGISTRATION)
    public String registrationPost(@ModelAttribute("userForm") User userForm, Model model) {
        User user = userDetailsService.getUserByEmail(userForm.getEmail());
        if (user != null) {
            model.addAttribute("errorEmail", "Пользователь с такой электронной почтой уже существует");
            return "registration";
        }

        userDetailsService.addUser(userForm);

        securityService.autoLogin(userForm.getEmail(), userForm.getPasswordConfirm());
        return REDIRECT_ON_MAIN_PAGE;
    }
}