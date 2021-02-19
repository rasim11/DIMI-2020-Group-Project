package com.netcracker.project.controllers;

import com.netcracker.project.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @Autowired
    private SecurityService securityService;

    @GetMapping("/")
    public String mainPageGet(Model model) {
        if (securityService.isAuthenticated()){
            String userFirstname = securityService.getCurrentUserFirstName();
            model.addAttribute("userFirstname", userFirstname);
        }

        return "main";
    }
}
