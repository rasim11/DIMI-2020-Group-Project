package com.netcracker.project.controllers;

import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class RegistrationController {
    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private EntityService entityService;

    @GetMapping(API + VERSION + USER_MANAGEMENT + USER_REGISTRATION)
    public String registrationGet(Model model) {
        model.addAttribute("userForm", new User());
        return "registration";
    }


    @PostMapping(API + VERSION + USER_MANAGEMENT + USER_REGISTRATION)
    public String registrationPost(@ModelAttribute("userForm") User userForm, Model model) {
        User user = userDetailsService.getUserByEmail(userForm.getEmail());
        if (user != null) {
            model.addAttribute("errorEmail", "Пользователь с такой электронной почтой уже существует");
            return "registration";
        }

        Role role = entityService.getRoleByName("Пользователь");
        if (role == null) {
            throw new UsernameNotFoundException("DB fatal error. User Role not found!");
        }

        userDetailsService.addUser(userForm, role);

        securityService.autoLogin(userForm.getEmail(), userForm.getPasswordConfirm());
        return REDIRECT_ON_MAIN_PAGE;
    }
}


//    JsonNode roles = restTemplate.getForObject("http://localhost:8082/get-all-role", JsonNode.class);
//    List<Role> rolesList = mapper.convertValue(
//            roles,
//            new TypeReference<List<Role>>(){}
//    );
//        return rolesList;