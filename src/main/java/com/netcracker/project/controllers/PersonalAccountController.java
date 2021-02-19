package com.netcracker.project.controllers;

import com.netcracker.project.model.User;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PersonalAccountController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/personal-account")
    public String personalAccountGet(Model model) {
        if (!securityService.isAuthenticated()) {
            return "redirect:/";
        }

        User user = userDetailsService.getUserByEmail(securityService.getCurrentEmail());
        User oldUser = userDetailsService.getUserByEmail(securityService.getCurrentEmail());
        model.addAttribute("userFirstname", user.getFirstname());
        model.addAttribute("userForm", user);
        model.addAttribute("oldUser", oldUser);

        return "personal-account";
    }

    @PostMapping("/personal-account")
    public String personalAccountPost(@ModelAttribute("userForm") User userForm,
                                      @RequestParam String point, Model model) {
        if (!securityService.isAuthenticated()) {
            return "redirect:/";
        }

        if (point.equals("basicData")) {
            User user = userDetailsService.getUserByEmail(userForm.getEmail());
            if (user != null && !userForm.getId().equals(user.getId())) {
                User oldUser = userDetailsService.getUserByEmail(securityService.getCurrentEmail());
                model.addAttribute("oldUser", oldUser);
                model.addAttribute("errorEmail", "Пользователь с такой электронной почтой уже существует");
                model.addAttribute("userFirstname", user.getFirstname());
                return "personal-account";
            }

            user = userDetailsService.getUserById(userForm.getId());
            String url = user.getEmail().equals(userForm.getEmail()) ? "redirect:/personal-account" :
                    "redirect:/logout";

            user.update(userForm);
            userDetailsService.updateUser(user);

            return url;
        } else {
            User user = userDetailsService.getUserById(userForm.getId());
            user.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));
            userDetailsService.updateUser(user);

            return "redirect:/logout";
        }
    }
}
