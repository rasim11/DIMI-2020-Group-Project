package com.netcracker.project.controllers;

import com.netcracker.project.components.UserNotConfirm;
import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class AdminController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserNotConfirm userNotConfirm;

    @GetMapping(LOCAL_URL_ADMINISTRATION)
    public String administrationGet(Model model) {
        return "administration";
    }

    @GetMapping(LOCAL_URL_USER_REGISTRATION_ADMIN)
    public String registrationThroughAdminGet(Model model) {
        List<Role> roles = Arrays.stream(Role.values()).collect(Collectors.toList());
        roles.remove(Role.ADMIN);

        model.addAttribute("title", "SIT|Регистрация пользователя");
        model.addAttribute("roles", roles);
        model.addAttribute("userForm", new User());
        return "registration-through-admin";
    }

    @PostMapping(LOCAL_URL_USER_REGISTRATION_ADMIN)
    public String registrationThroughAdminPost(@ModelAttribute("userForm") User userForm) {
        Role curRole = userForm.getRole();

        if (curRole.equals(Role.USER)) {
            userDetailsService.postUser(userForm);
        } else {
            userDetailsService.addWorkerOrResponsible(userForm);
        }

        userNotConfirm.deleteUserWithTime(userDetailsService.getUserByEmail(userForm.getEmail()));

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
        Role newRole = userForm.getRole();
        Role curRole = user.getRole();

        userDetailsService.severTies(user, newRole, userForm.getRegion());
        userDetailsService.severTies(user);

        if (!userDetailsService.isWorker(curRole).equals(userDetailsService.isWorker(newRole))) {
            user.setTasksCount(0L);
        }

        if (newRole.equals(Role.USER)) {
            userDetailsService.editUser(user);
        } else {
            userDetailsService.editWorkerOrResponsible(user, userForm);
        }

        return REDIRECT_ON_ADMINISTRATION;
    }
}
