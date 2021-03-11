package com.netcracker.project.controllers;

import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
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
public class AdminController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private EntityService entityService;

    @GetMapping(LOCAL_URL_ADMINISTRATION)
    public String administrationGet(Model model) {
        return "administration";
    }

    @GetMapping(LOCAL_URL_USER_REGISTRATION_ADMIN)
    public String registrationThroughAdminGet(Model model) {
        Iterable<Role> roles = entityService.getAllRoles();

        model.addAttribute("roles", roles);
        model.addAttribute("userForm", new User());
        return "registration-through-admin";
    }

    @PostMapping(LOCAL_URL_USER_REGISTRATION_ADMIN)
    public String registrationThroughAdminPost(@ModelAttribute("userForm") User userForm) {
        String curRoleName = userForm.getRole().getName();

        if (curRoleName.equals("Пользователь")) {
            userDetailsService.addUser(userForm);
        } else {
            userDetailsService.addWorkerOrResponsible(userForm, curRoleName, userForm.getRegion().getId());
        }

        return REDIRECT_ON_ADMINISTRATION;
    }

    @GetMapping(LOCAL_URL_USER_ROLE_EDIT)
    public String userEditGet(@PathVariable Long id, Model model) {
        User user = userDetailsService.getUserById(id);
        if (user == null) {
            return REDIRECT_ON_ADMINISTRATION;
        }

        model.addAttribute("user", user);
        return "user-role-edit";
    }

    @PostMapping(LOCAL_URL_USER_ROLE_EDIT)
    public String userEditPost(@PathVariable Long id, @ModelAttribute("user") User userForm) {
        User user = userDetailsService.getUserById(id);
        String newRoleName = userForm.getRole().getName();
        String curRoleName = user.getRole().getName();

        userDetailsService.severTies(user);

        if (!userDetailsService.isWorker(curRoleName).equals(userDetailsService.isWorker(newRoleName))) {
            user.setTasksCount(0L);
        }

        if (newRoleName.equals("Пользователь")) {
            userDetailsService.editUser(user);
        } else {
            userDetailsService.editWorkerOrResponsible(user, newRoleName, userForm.getRegion().getId());
        }

        return REDIRECT_ON_ADMINISTRATION;
    }
}
