package com.netcracker.project.service.impl;


import com.netcracker.project.model.Role;
import com.netcracker.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    public static final String URL_GET_USER_BY_EMAIL = SERVER + API + VERSION + USER_MANAGEMENT +
            USER_GET + BY_EMAIL + "/{email}";
    public static final String URL_GET_USER_BY_ID = SERVER + API + VERSION + USER_MANAGEMENT +
            USER_GET + BY_ID + "/{id}";
    public static final String URL_POST_USER = SERVER + API + VERSION + USER_MANAGEMENT + USER_POST;
    public static final String URL_DELETE_USER = SERVER + API + VERSION + USER_MANAGEMENT + USER_DELETE + "/{id}";

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userDb = restTemplate.getForObject(URL_GET_USER_BY_EMAIL, User.class, email);

        if (userDb == null) {
            throw new UsernameNotFoundException("Пользователь не найден");
        }

        return userDb;
    }

    public void addUser(User user, Role role) {
        user.dataExtension(role);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        restTemplate.postForLocation(URL_POST_USER, user);
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

    public void deleteUser(Long id) {
        restTemplate.delete(URL_DELETE_USER, id);
    }
}
