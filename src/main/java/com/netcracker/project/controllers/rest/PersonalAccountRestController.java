package com.netcracker.project.controllers.rest;

import com.netcracker.project.model.Region;
import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import static com.netcracker.project.url.UrlTemplates.*;

@RestController
public class PersonalAccountRestController {
    private static final Long USERS_COUNT_ON_PAGE = 2L;

    @Autowired
    private SecurityService securityService;
    @Autowired
    private EntityService entityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping(LOCAL_URL_GET_CURRENT_USER)
    public User getCurUser() {
        return securityService.getCurrentUser();
    }

    @PutMapping(LOCAL_URL_PUT_USER)
    public String putUser(@RequestBody User userReq) {
        if (userReq.getPassword() == null) {
            User user = userDetailsService.getUserByEmail(userReq.getEmail());
            if (user != null && !user.getId().equals(userReq.getId())) {
                return "err";
            }

            user = getCurUser();
            userDetailsService.updateUserBasicData(user, userReq);

            securityService.autoLogin(userReq.getEmail(), user.getPasswordConfirm());
        } else {
            User user = getCurUser();
            userDetailsService.updateUserPass(user, userReq);

            securityService.autoLogin(user.getEmail(), userReq.getPasswordConfirm());
        }

        return "";
    }

    @DeleteMapping(LOCAL_URL_DELETE_USER)
    public void deleteUser(@PathVariable String email) {
        User user = userDetailsService.getUserByEmail(email);

        userDetailsService.deleteUser(user);
    }

    @GetMapping(LOCAL_URL_GET_EMPLOYEES)
    public Map<String, Object> getEmployees(@PathVariable String email) {
        Region region = entityService.getRegionByResponsibleEmail(email);
        Iterable<User> users = userDetailsService.getUsersByRegionId(region.getId());
        for (User user : users) {
            user.setPassword(null);
        }

        List<User> userList = new ArrayList<>();
        users.forEach(userList::add);

        Map<String, Object> result = new HashMap<>();
        result.put("employees", userList.stream().sorted((a, b) -> b.getTasksCount().compareTo(a.getTasksCount())).
                limit(USERS_COUNT_ON_PAGE).collect(Collectors.toList()));
        result.put("pageCount", (long) Math.ceil(1.0 * userList.size() / USERS_COUNT_ON_PAGE));

        return result;
    }

    @GetMapping(LOCAL_URL_GET_TASKS_BY_WORKER_ID)
    public Long getTasksByWorkerId(@PathVariable Long id) {
        User user = userDetailsService.getUserById(id);
        user.setActiveTasks(entityService.getActiveTaskBySocialWorkersId(user.getId()));
        return user.calculateActiveTask();
    }
}
