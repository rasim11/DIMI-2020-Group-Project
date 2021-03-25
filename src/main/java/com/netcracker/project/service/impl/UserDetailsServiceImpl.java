package com.netcracker.project.service.impl;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.project.model.*;
import com.netcracker.project.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    public static final String DEFAULT_AVATAR = "data:image/png;base64,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";

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private EntityService entityService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userDb = restTemplate.getForObject(URL_GET_USER_BY_EMAIL, User.class, email);

        if (userDb == null) {
            throw new UsernameNotFoundException("Пользователь не найден");
        }

        return userDb;
    }

    public void addUser(User user) {
        Role role = Role.USER;

        user.setUserImage(DEFAULT_AVATAR);
        user.dataExtension(role);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        restTemplate.postForLocation(URL_POST_USER, user);
    }

    public void addWorkerOrResponsible(User user, Role role, Long idRegion) {
        Region region = entityService.getRegionById(idRegion);
        if (region == null) {
            throw new UsernameNotFoundException("DB fatal error. User Region not found!");
        }

        user.setUserImage(DEFAULT_AVATAR);
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
            task.setStatus(Status.CANCELED);
            task.setAuthor(null);
            task.setCompleteDate(LocalDateTime.now());
            entityService.putTask(task);

            Feedback feedback = entityService.getFeedbackByTaskId(task.getId());
            if (feedback == null) {
                feedback = new Feedback();
                feedback.dataExtension(task, "Связанный с данной проблемой аккаунт был удалён!");
                entityService.postFeedback(feedback);
            }
        }

        restTemplate.delete(URL_DELETE_COMMENT_BY_AUTHOR_ID, user.getId());
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
        return role.equals(Role.RESPONSIBLE) || role.equals(Role.SOCIAL_WORKER);
    }

    public void editUser(User user) {
        Role role = Role.USER;
        user.setRole(role);
        user.setRegion(null);

        restTemplate.postForLocation(URL_POST_USER, user);
    }

    public void editWorkerOrResponsible(User user, Role role, Long idRegion) {
        Region region = entityService.getRegionById(idRegion);
        if (region == null) {
            throw new UsernameNotFoundException("DB fatal error. User Region not found!");
        }

        user.setRole(role);
        if (role.equals(Role.RESPONSIBLE)) {
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
            entityService.deleteActiveTask(user.getId(), URL_DELETE_ACTIVE_TASK_BY_WORKER_ID);
        }
    }

    public Iterable<User> getUsersByRegionId(Long id) {
        JsonNode users = restTemplate.getForObject(URL_GET_USERS_BY_REGION_ID, JsonNode.class, id);
        return mapper.convertValue(users,
                new TypeReference<Iterable<User>>() {
                }
        );
    }

    public void putUser(User user) {
        restTemplate.postForLocation(URL_POST_USER, user);
    }
}
