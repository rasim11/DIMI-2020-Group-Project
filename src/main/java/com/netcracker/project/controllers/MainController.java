package com.netcracker.project.controllers;

import static com.netcracker.project.url.UrlTemplates.*;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping(LOCAL_URL_MAIN_PAGE)
    public String mainPageGet(Model model) {
        return "main";
    }
}
