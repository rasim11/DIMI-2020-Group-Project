package com.netcracker.project.service.impl;


import com.netcracker.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userDb = restTemplate.getForObject("http://localhost:8082/get-user/{email}", User.class, email);

        if (userDb == null) {
            throw new UsernameNotFoundException("Пользователь не найден");
        }

        return userDb;
    }
}
