package com.netcracker.project.service.impl;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.project.model.*;
import com.netcracker.project.service.EntityService;
import com.netcracker.project.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Base64;

import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    public static String defaultAvatar = "data:image/png;base64,";
    static {
        try {
            defaultAvatar += Base64.getEncoder().encodeToString(
                    Files.readAllBytes(Paths.get("src/main/resources/static/img/default-user.png")));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private EntityService entityService;
    @Autowired
    private MailService mailService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userDb = restTemplate.getForObject(URL_GET_USER_BY_EMAIL, User.class, email);

        if (userDb == null) {
            throw new UsernameNotFoundException("Пользователь не найден");
        }

        return userDb;
    }

    public void postUser(User user) {
        Role role = Role.USER;

        user.setUserImage(defaultAvatar);
        user.dataExtension(role);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        restTemplate.postForLocation(URL_POST_USER, user);

        mailService.confirmAccount(user);
    }

    public void addWorkerOrResponsible(User user) {
        Role role = user.getRole();

        Region region = entityService.getRegionById(user.getRegion().getId());
        if (region == null) {
            throw new UsernameNotFoundException("DB fatal error. Region not found!");
        }

        user.setAppointment(user.getAppointment() != null && user.getAppointment().trim().equals("") ? null :
                user.getAppointment());

        user.setMunicipality(user.getMunicipality() != null ?
                entityService.getMunicipalityById(user.getMunicipality().getId()) : null);

        user.setUserImage(defaultAvatar);
        if (role.equals(Role.RESPONSIBLE)) {
            user.dataExtension(role, null);

            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            restTemplate.postForLocation(URL_POST_USER, user);

            region.setResponsible(getUserByEmail(user.getEmail()));
            entityService.putRegion(region);
        } else {
            user.dataExtension(role, region);

            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            restTemplate.postForLocation(URL_POST_USER, user);
        }
    }

    public User getUserByEmail(String email) {
        return restTemplate.getForObject(URL_GET_USER_BY_EMAIL, User.class, email);
    }

    public User getUserById(Long id) {
        return restTemplate.getForObject(URL_GET_USER_BY_ID, User.class, id);
    }

    public void updateUserBasicData(User user, User userForm) {
        user.update(userForm);
        restTemplate.postForLocation(URL_POST_USER, user);
    }

    public void updateUserPass(User user, User userForm) {
        user.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));
        restTemplate.postForLocation(URL_POST_USER, user);
    }

    public void deleteUser(User user) {
        severTies(user);

        Iterable<Task> tasks = entityService.getTasksByAuthorsEmail(user.getEmail());
        for (Task task : tasks) {
            if (!(task.getStatus().equals(Status.RESOLVED) || task.getStatus().equals(Status.REJECTED) ||
                    task.getStatus().equals(Status.CANCELED_AS_DUPLICATE))) {
                task.setStatus(Status.CANCELED);
                task.setCompleteDate(LocalDateTime.now());

                Comment feedback = entityService.getFeedbackByTaskId(task.getId());
                if (feedback == null) {
                    Comment comment = new Comment(null, task,
                            "Связанный с данной проблемой аккаунт был удалён!",
                            LocalDateTime.now(), null, "Причина");
                    entityService.postComment(comment);
                }
            }
            task.setAuthor(null);
            entityService.putTask(task);
        }

        if (user.getRole().equals(Role.RESPONSIBLE) || user.getRole().equals(Role.DEPUTY)) {
            tasks = entityService.getTasksByCurrResponsibleId(user.getId());
            for (Task task : tasks) {
                if (task.getRegion().getResponsible() != null) {
                    task.setCurrResponsible(task.getRegion().getResponsible());
                } else {
                    task.setCurrResponsible(null);
                }
                entityService.putTask(task);
            }
        }

        Iterable<History> histories = entityService.getHistoriesByPreviousCurrentResponsibleId(user.getId());
        for (History history : histories) {
            entityService.deleteObject(history.getId(), URL_DELETE_HISTORY);
        }

        Iterable<Comment> comments = entityService.getCommentsByAuthorId(user.getId());
        for (Comment comment : comments) {
            comment.setAuthor(null);
            entityService.postComment(comment);
        }

        restTemplate.delete(URL_DELETE_SUBSCRIPTIONS_BY_USER_ID, user.getId());
        restTemplate.delete(URL_DELETE_USER, user.getEmail());
    }

    public Iterable<User> getAllUsers() {
        JsonNode users = restTemplate.getForObject(URL_GET_ALL_USERS, JsonNode.class);
        return mapper.convertValue(users,
                new TypeReference<Iterable<User>>() {
                }
        );
    }

    public Boolean isWorker(Role role) {
        return role.equals(Role.RESPONSIBLE) || role.equals(Role.SOCIAL_WORKER) || role.equals(Role.DEPUTY);
    }

    public void editUser(User user) {
        user.setRole(Role.USER);
        user.setRegion(null);
        user.setAppointment(null);
        user.setMunicipality(null);

        restTemplate.postForLocation(URL_POST_USER, user);
    }

    public void editWorkerOrResponsible(User user, User userForm) {
        Region region = entityService.getRegionById(userForm.getRegion().getId());
        if (region == null) {
            throw new UsernameNotFoundException("DB fatal error. Region not found!");
        }

        user.setRole(userForm.getRole());
        user.setAppointment(userForm.getAppointment() != null && !userForm.getAppointment().trim().equals("") ?
                userForm.getAppointment() : null);
        user.setMunicipality(userForm.getMunicipality() != null ?
                entityService.getMunicipalityById(userForm.getMunicipality().getId()) : null);

        if (user.getRole().equals(Role.RESPONSIBLE)) {
            user.setRegion(null);
            restTemplate.postForLocation(URL_POST_USER, user);

            region.setResponsible(getUserByEmail(user.getEmail()));
            entityService.putRegion(region);
        } else {
            user.setRegion(region);
            restTemplate.postForLocation(URL_POST_USER, user);
        }
    }

    public void severTies(User user) {
        if (user.getRole().equals(Role.RESPONSIBLE)) {
            Region region = entityService.getRegionByResponsibleEmail(user.getEmail());

            region.setResponsible(null);
            entityService.putRegion(region);
        } else if (user.getRole().equals(Role.SOCIAL_WORKER)) {
            entityService.deleteObject(user.getId(), URL_DELETE_ACTIVE_TASK_BY_WORKER_ID);
        }
    }

    public void severTies(User user, Role newRole, Region newRegion) {
        Region region = user.getRole().equals(Role.RESPONSIBLE) ?
                entityService.getRegionByResponsibleEmail(user.getEmail()) :
                user.getRegion();

        if (!((newRole.equals(Role.RESPONSIBLE) && user.getRole().equals(Role.DEPUTY) ||
                newRole.equals(Role.DEPUTY) && user.getRole().equals(Role.RESPONSIBLE) ||
                user.getRole().equals(newRole)) && region.getId().equals(newRegion.getId()))) {
            Iterable<Task> tasks = entityService.getTasksByCurrResponsibleId(user.getId());

            for (Task task : tasks) {
                if (task.getRegion().getResponsible() != null &&
                        !task.getRegion().getResponsible().getId().equals(user.getId())) {
                    task.setCurrResponsible(task.getRegion().getResponsible());
                    History history = new History(null, task, user, task.getRegion().getResponsible(),
                            LocalDateTime.now());
                    entityService.postHistory(history);
                } else {
                    task.setCurrResponsible(null);
                }
                entityService.putTask(task);
            }
        }
    }

    public Iterable<User> getUsersByRegionId(String url, Long id) {
        JsonNode users = restTemplate.getForObject(url, JsonNode.class, id);
        return mapper.convertValue(users,
                new TypeReference<Iterable<User>>() {
                }
        );
    }

    public void putUser(User user) {
        restTemplate.postForLocation(URL_POST_USER, user);
    }

    public User getUserByUrlAccountConfirm(String url) {
        return restTemplate.getForObject(URL_GET_USER_BY_URL_ACCOUNT_CONFIRM, User.class, url);
    }
}
