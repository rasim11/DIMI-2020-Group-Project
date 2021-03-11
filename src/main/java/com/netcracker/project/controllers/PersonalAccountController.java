package com.netcracker.project.controllers;

import com.netcracker.project.model.Region;
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

    @GetMapping(LOCAL_URL_PERSONAL_ACCOUNT)
    public String personalAccountGet(Model model) {
        return "personal-account";
    }

    @GetMapping(LOCAL_URL_USER_PROFILE)
    public String showProfile(@PathVariable Long id, Model model) {
        if (!securityService.isAuthenticated()) {
            model.addAttribute("msgErr", "Профили может просматривать только зарегистрированный пользователь!");
            return "profile";
        }

        User user = userDetailsService.getUserById(id);
        if (user == null) {
            return REDIRECT_ON_MAIN_PAGE;
        }

        User curUser = securityService.getCurrentUser();
        if (curUser.getId().equals(id)) {
            model.addAttribute("isCurUser", true);
            model.addAttribute("user", curUser);
            model.addAttribute("roleName", curUser.getRole().getName());
        } else {
            model.addAttribute("user", user);
            model.addAttribute("roleName", user.getRole().getName());
        }

        Region curUserRegion = curUser.getRegion();
        Region targetUserRegion = user.getRegion();

        if (curUserRegion != null && targetUserRegion != null) {
            if (curUserRegion.getRegionName().equals(targetUserRegion.getRegionName())) {
                model.addAttribute("isEmp", true);
            }
        } else if (curUserRegion != null && curUserRegion.getResponsible() != null) {
            Long regionResponsibleId = curUserRegion.getResponsible().getId();
            if (regionResponsibleId.equals(user.getId())) {
                model.addAttribute("isEmp", true);
            }
        } else if (targetUserRegion != null && targetUserRegion.getResponsible() != null) {
            Long regionResponsibleId = targetUserRegion.getResponsible().getId();
            if (regionResponsibleId.equals(curUser.getId())) {
                model.addAttribute("isEmp", true);
            }
        }

        return "profile";
    }
}
