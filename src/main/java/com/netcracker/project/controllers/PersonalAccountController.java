package com.netcracker.project.controllers;

import com.netcracker.project.components.UserNotConfirm;
import com.netcracker.project.controllers.rest.PersonalAccountRestController;
import com.netcracker.project.model.Region;
import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.netcracker.project.url.UrlTemplates.*;

@Controller
public class PersonalAccountController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private EntityService entityService;
    @Autowired
    private UserNotConfirm userNotConfirm;

    @GetMapping(LOCAL_URL_PERSONAL_ACCOUNT)
    public String personalAccountGet(Model model) {
        model.addAttribute("timeBeforeAccountDeletion", PersonalAccountRestController.TIME_BEFORE_ACCOUNT_DELETION);
        return "personal-account";
    }

    @GetMapping(LOCAL_URL_USER_PROFILE)
    public String showProfile(@PathVariable Long id, Model model) {
        if (!securityService.isAuthenticated()) {
            model.addAttribute("msgErr", "Профили может просматривать только зарегистрированный пользователь!");
            return "profile";
        }

        User targetUser = userDetailsService.getUserById(id);
        if (targetUser == null) {
            return REDIRECT_ON_MAIN_PAGE;
        }

        User curUser = securityService.getCurrentUser();
        if (curUser.getId().equals(id)) {
            model.addAttribute("isCurUser", true);
        }
        model.addAttribute("user", targetUser);
        model.addAttribute("role", targetUser.getRole());

        Region curUserRegion = curUser.getRegion() != null ? curUser.getRegion() :
                entityService.getRegionByResponsibleEmail(curUser.getEmail());
        Region targetUserRegion = targetUser.getRegion() != null ? targetUser.getRegion() :
                entityService.getRegionByResponsibleEmail(targetUser.getEmail());

        if (targetUserRegion != null) {
            model.addAttribute("region", targetUserRegion.getRegionName());
        }

        if (curUserRegion != null && targetUserRegion != null &&
                curUserRegion.getRegionName().equals(targetUserRegion.getRegionName())) {
            model.addAttribute("isEmp", true);
        }

        return "profile";
    }

    @PostMapping(LOCAL_URL_USER_PROFILE)
    public String userActivities(@PathVariable Long id, @RequestParam("btn") Boolean btnValue) {
        if (btnValue) {
            return "redirect:" + LOCAL_URL_USER_ROLE_EDIT.replace("{id}", id.toString());
        } else {
            User user = userDetailsService.getUserById(id);
            userDetailsService.deleteUser(user);
            return REDIRECT_ON_ADMINISTRATION;
        }
    }

    @GetMapping(LOCAL_URL_POST_EMP)
    public String registrationEmpGet(Model model) {
        Role curRole = securityService.getCurrentUser().getRole();

        List<Role> roles = new ArrayList<>();
        roles.add(Role.SOCIAL_WORKER);

        if (curRole.equals(Role.RESPONSIBLE)) {
            roles.add(Role.DEPUTY);
        }

        model.addAttribute("title", "SIT|Регистрация сотрудника");
        model.addAttribute("userForm", new User());
        model.addAttribute("roles", roles);
        return "registration-through-admin";
    }

    @PostMapping(LOCAL_URL_POST_EMP)
    public String registrationEmpPost(@ModelAttribute("userForm") User userForm) {
        User curUser = securityService.getCurrentUser();
        Region region = curUser.getRole().equals(Role.RESPONSIBLE) ?
                entityService.getRegionByResponsibleEmail(curUser.getEmail()) : curUser.getRegion();
        userForm.setRegion(region);

        userDetailsService.addWorkerOrResponsible(userForm);

        userNotConfirm.deleteUserWithTime(userDetailsService.getUserByEmail(userForm.getEmail()));

        return "redirect:" + LOCAL_URL_PERSONAL_ACCOUNT;
    }
}
