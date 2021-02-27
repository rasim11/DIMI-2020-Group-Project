package com.netcracker.project.controllers;

import com.netcracker.project.model.User;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class LoginController {
    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping(API + VERSION + USER_MANAGEMENT + USER_LOGIN)
    public String loginGet(Model model) {
        return "login";
    }

    @PostMapping(API + VERSION + USER_MANAGEMENT + USER_LOGIN)
    public String loginPost(@RequestParam String email, @RequestParam String password, Model model) {
        User user = userDetailsService.getUserByEmail(email);
        if (user == null) {
            model.addAttribute("errorEmail", "Пользователь не найден");
            model.addAttribute("email", email);
            model.addAttribute("password", password);
            return "login";
        }

        securityService.autoLogin(email, password);

        if (!securityService.isAuthenticated()) {
            model.addAttribute("errorPass", "Введён неверный пароль");
            model.addAttribute("email", email);
            model.addAttribute("password", password);
            return "login";
        }

        return REDIRECT_ON_MAIN_PAGE;
    }
}
