package com.netcracker.project.controllers;

import com.netcracker.project.components.UserNotConfirm;
import com.netcracker.project.model.User;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class RegistrationController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserNotConfirm userNotConfirm;

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

        userDetailsService.postUser(userForm);

        userNotConfirm.deleteUserWithTime(userDetailsService.getUserByEmail(userForm.getEmail()));

        securityService.autoLogin(userForm.getEmail(), userForm.getPasswordConfirm());
        return REDIRECT_ON_MAIN_PAGE;
    }

    @GetMapping(LOCAL_URL_GET_CONFIRM_ACCOUNT)
    public String confirmAccount(@PathVariable String url, Model model) {
        User user = userDetailsService.getUserByUrlAccountConfirm(url);

        if (user != null) {
            user.setUrlAccountConfirm(null);
            user.setIsAccountConfirmed(true);

            userDetailsService.putUser(user);

            if (securityService.isAuthenticated() &&
                    securityService.getCurrentUser().getEmail().equals(user.getEmail())) {
                User curUser = securityService.getCurrentUser();
                securityService.autoLogin(curUser.getEmail(), curUser.getPasswordConfirm());
            }

            model.addAttribute("msg", "Подтверждение адреса электронной почты успешно завершено!");
        } else {
            model.addAttribute("msg", "Данная ссылка более не действительна!");
        }

        return "confirm-account";
    }
}