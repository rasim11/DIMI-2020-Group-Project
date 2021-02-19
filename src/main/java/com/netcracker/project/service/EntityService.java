package com.netcracker.project.service;

import com.netcracker.project.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EntityService {
    @Autowired
    private RestTemplate restTemplate;

    public Role getRoleById(Long id) {
        return restTemplate.getForObject("http://localhost:8082/get-role/{id}", Role.class, id);
    }
}
