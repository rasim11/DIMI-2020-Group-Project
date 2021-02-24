package com.netcracker.project.controllers;

import com.netcracker.project.model.User;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping("/")
    public String mainPageGet(Model model) {
        if (securityService.isAuthenticated()){
            User user = userDetailsService.getUserByEmail(securityService.getCurrentEmail());
            model.addAttribute("userFirstname",user.getFirstname());
            model.addAttribute("userId", user.getId());
        }

        return "main";
    }
}
