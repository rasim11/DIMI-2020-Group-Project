package com.netcracker.project.controllers;

import com.netcracker.project.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class AdminController {
    @Autowired
    private SecurityService securityService;

    @GetMapping(API + VERSION + ADMIN_MANAGEMENT)
    public String administrationGet(Model model) {
        return "administration";
    }
}
