package com.netcracker.project.controllers.rest;

import com.netcracker.project.model.Region;
import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.MailService;
import com.netcracker.project.service.SecurityService;
import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.netcracker.project.url.UrlTemplates.*;

@RestController
public class PersonalAccountRestController {
    private static final Long USERS_COUNT_ON_PAGE = 10L;
    public static final Long TIME_BEFORE_ACCOUNT_DELETION = 24 * 60 * 60 * 1000L;

    @Autowired
    private SecurityService securityService;
    @Autowired
    private EntityService entityService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private MailService mailService;

    @GetMapping(LOCAL_URL_GET_CURRENT_USER)
    public User getCurUser() {
        return userDetailsService.getUserByEmail(securityService.getCurrentUser().getEmail());
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
    public Map<String, Object> getEmployees(@RequestParam(required = false) String searchString,
                                            @RequestParam(required = false) Integer criterion,
                                            @RequestParam Integer sort, @RequestParam Long page,
                                            @RequestParam(required = false) String[] actualTask,
                                            @RequestParam(required = false) String[] resolvedTask,
                                            @RequestParam(required = false) String[] regDate,
                                            @RequestParam(required = false) String[] empRoles) {
        User curUser = userDetailsService.getUserByEmail(securityService.getCurrentUser().getEmail());
        Region region = curUser.getRegion() != null ? curUser.getRegion() :
                entityService.getRegionByResponsibleEmail(curUser.getEmail());
        List<User> userList = new ArrayList<>();

        userDetailsService.getUsersByRegionId(URL_GET_WORKERS_BY_REGION_ID, region.getId()).forEach(userList::add);
        if (curUser.getRole().equals(Role.RESPONSIBLE)) {
            userDetailsService.getUsersByRegionId(URL_GET_DEPUTIES_BY_REGION_ID, region.getId()).forEach(userList::add);
        }

        for (User user : userList) {
            user.setActiveTasks(entityService.getActiveTaskBySocialWorkersId(user.getId()));
            user.setPassword(null);
        }

        userList = userList.stream().sorted((a, b) -> {
            if (sort == null) {
                return 0;
            }

            int res = 0;
            switch (sort) {
                case 0:
                    res = a.getRegDate().compareTo(b.getRegDate());
                    break;
                case 1:
                    res = b.calculateActiveTask().compareTo(a.calculateActiveTask());
                    break;
                case 2:
                    res = b.getTasksCount().compareTo(a.getTasksCount());
                    break;
            }
            return res;
        }).filter(x -> {
            if (searchString == null || criterion == null) {
                return true;
            }
            String searchStringTrim = searchString.trim();

            boolean res = false;
            switch (criterion) {
                case 0:
                    res = String.join(" ", x.getLastname(), x.getFirstname(),
                            x.getMiddlename()).contains(searchStringTrim);
                    break;
                case 1:
                    res = x.getEmail().contains(searchStringTrim);
                    break;
                case 2:
                    res = x.getPhoneNumber().contains(searchStringTrim);
                    break;
            }
            return res;
        }).filter(x -> {
            if (regDate == null) {
                return true;
            }

            List<LocalDate> localDates = Arrays.stream(regDate).map(y -> {
                String[] arr = y.split("-");
                return LocalDate.of(Integer.parseInt(arr[0]), Integer.parseInt(arr[1]),
                        Integer.parseInt(arr[2]));
            }).collect(Collectors.toList());

            return x.getRegDate().toLocalDate().compareTo(localDates.get(0)) >= 0 &&
                    x.getRegDate().toLocalDate().compareTo(localDates.get(1)) <= 0;
        }).filter(x -> {
            if (resolvedTask == null) {
                return true;
            }

            Long[] resolvedTaskRange = {Long.parseLong(resolvedTask[0]),
                    resolvedTask[1].equals("maxLong") ? Long.MAX_VALUE : Long.parseLong(resolvedTask[1])};

            return resolvedTaskRange[0] <= x.getTasksCount() && x.getTasksCount() <= resolvedTaskRange[1];
        }).filter(x -> {
            if (actualTask == null) {
                return true;
            }

            Long[] actualTaskRange = {Long.parseLong(actualTask[0]),
                    actualTask[1].equals("maxLong") ? Long.MAX_VALUE : Long.parseLong(actualTask[1])};

            return actualTaskRange[0] <= x.calculateActiveTask() && x.calculateActiveTask() <= actualTaskRange[1];
        }).filter(x -> {
            if (empRoles == null) {
                return true;
            }

            List<Role> roles = Arrays.stream(empRoles).map(Role::valueOf).collect(Collectors.toList());
            return roles.contains(x.getRole());
        }).collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("employees", userList.stream().skip(page * USERS_COUNT_ON_PAGE).
                limit(USERS_COUNT_ON_PAGE).collect(Collectors.toList()));
        result.put("pageCount", (long) Math.ceil(1.0 * userList.size() / USERS_COUNT_ON_PAGE));
        result.put("employeesCount", userList.size());

        return result;
    }

    @GetMapping(LOCAL_URL_GET_TASKS_BY_WORKER_ID)
    public Long getTasksByWorkerId(@PathVariable Long id) {
        User user = userDetailsService.getUserById(id);
        user.setActiveTasks(entityService.getActiveTaskBySocialWorkersId(user.getId()));
        return user.calculateActiveTask();
    }

    @GetMapping(LOCAL_URL_GENERATE_URL_CONFIRM_ACCOUNT)
    public void generateUrlConfirmAccount() {
        User user = userDetailsService.getUserByEmail(securityService.getCurrentUser().getEmail());
        if (user == null) {
            return;
        }

        user.setUrlAccountConfirm(UUID.randomUUID().toString());
        userDetailsService.putUser(user);

        mailService.confirmAccount(user);
    }

    @GetMapping(LOCAL_URL_CHECK_USER_ON_LOGOUT)
    public String checkUserOnLogout() {
        if (securityService.isAuthenticated()) {
            User curUser = securityService.getCurrentUser();
            if (!curUser.getIsAccountConfirmed()) {
                if (userDetailsService.getUserById(curUser.getId()) != null) {
                    return Boolean.toString(false);
                } else {
                    return Boolean.toString(true);
                }
            }
        }

        return "disable";
    }
}
