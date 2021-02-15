package com.netcracker.project.controllers;


import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Controller
public class LoginAndRegistration {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @GetMapping("/login")
    public String loginGet(Model model) {
        if (securityService.isAuthenticated()) {
            return "redirect:/";
        }
        return "login";
    }

    @PostMapping("/login")
    public String loginPost(@RequestParam String email, @RequestParam String password, Model model) {
        User user = restTemplate.getForObject("http://localhost:8082/get-user/{email}", User.class, email);
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

        return "redirect:/";
    }

    @GetMapping("/registration")
    public String registrationGet(Model model) {
        if (securityService.isAuthenticated()) {
            return "redirect:/";
        }

        model.addAttribute("userForm", new User());

        return "registration";
    }


    @PostMapping("/registration")
    public String registrationPost(@ModelAttribute("userForm") User userForm, Model model) {
        User user = restTemplate.getForObject("http://localhost:8082/get-user/{email}", User.class, userForm.getEmail());
        if (user != null) {
            model.addAttribute("errorEmail", "Пользователь с такой электронной почтой уже существует");
            return "registration";
        }

        Role role = restTemplate.getForObject("http://localhost:8082/get-role/{id}", Role.class, 1L);
        if (role == null) {
            throw new UsernameNotFoundException("DB fatal error");
        }

        userForm.dataExtension(role);
        userForm.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));

        restTemplate.postForLocation("http://localhost:8082/add-user", userForm);

        securityService.autoLogin(userForm.getEmail(), userForm.getPasswordConfirm());
        return "redirect:/";
    }
}


//    JsonNode roles = restTemplate.getForObject("http://localhost:8082/get-all-role", JsonNode.class);
//    List<Role> rolesList = mapper.convertValue(
//            roles,
//            new TypeReference<List<Role>>(){}
//    );
//        return rolesList;