package com.netcracker.project.controllers.rest;

import com.netcracker.project.model.Region;
import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import com.netcracker.project.service.EntityService;
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
    public Map<String, Object> getEmployees(@PathVariable String actualTask, @PathVariable Integer criterion,
                                            @PathVariable String email, @PathVariable Long page,
                                            @PathVariable String regDate, @PathVariable String resolvedTask,
                                            @PathVariable String searchString, @PathVariable Integer sort,
                                            @PathVariable Role role, @PathVariable Long regionId) {
        Region region = regionId != -1 ? entityService.getRegionById(regionId) :
                entityService.getRegionByResponsibleEmail(email);
        List<User> userList = new ArrayList<>();

        userDetailsService.getUsersByRegionId(URL_GET_WORKERS_BY_REGION_ID, region.getId()).forEach(userList::add);
        if (role.equals(Role.RESPONSIBLE)) {
            userDetailsService.getUsersByRegionId(URL_GET_DEPUTIES_BY_REGION_ID, region.getId()).forEach(userList::add);
        }

        for (User user : userList) {
            user.setActiveTasks(entityService.getActiveTaskBySocialWorkersId(user.getId()));
            user.setPassword(null);
        }

        userList = userList.stream().sorted((a, b) -> {
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
            if (searchString.equals("null")) {
                return true;
            }

            boolean res = false;
            switch (criterion) {
                case 0:
                    res = String.join(" ", x.getLastname(), x.getFirstname(),
                            x.getMiddlename()).contains(searchString);
                    break;
                case 1:
                    res = x.getEmail().contains(searchString);
                    break;
                case 2:
                    res = x.getPhoneNumber().contains(searchString);
                    break;
            }
            return res;
        }).filter(x -> {
            if (regDate.equals("null")) {
                return true;
            }

            List<LocalDate> localDates = Arrays.stream(regDate.split("\\|")).map(y -> {
                String[] arr = y.split("-");
                return LocalDate.of(Integer.parseInt(arr[0]), Integer.parseInt(arr[1]),
                        Integer.parseInt(arr[2]));
            }).collect(Collectors.toList());

            return x.getRegDate().compareTo(localDates.get(0)) >= 0 && x.getRegDate().compareTo(localDates.get(1)) <= 0;
        }).filter(x -> {
            if (resolvedTask.equals("null")) {
                return true;
            }

            String[] resolvedTaskTemp = resolvedTask.split("\\|");
            Long[] resolvedTaskRange = {Long.parseLong(resolvedTaskTemp[0]),
                    resolvedTaskTemp[1].equals("maxLong") ? Long.MAX_VALUE : Long.parseLong(resolvedTaskTemp[1])};

            return resolvedTaskRange[0] <= x.getTasksCount() && x.getTasksCount() <= resolvedTaskRange[1];
        }).filter(x -> {
            if (actualTask.equals("null")) {
                return true;
            }

            String[] actualTaskTemp = actualTask.split("\\|");
            Long[] actualTaskRange = {Long.parseLong(actualTaskTemp[0]),
                    actualTaskTemp[1].equals("maxLong") ? Long.MAX_VALUE : Long.parseLong(actualTaskTemp[1])};

            return actualTaskRange[0] <= x.calculateActiveTask() && x.calculateActiveTask() <= actualTaskRange[1];
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
}
