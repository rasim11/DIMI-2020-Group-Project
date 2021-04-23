package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.Region;
import com.netcracker.projectDb.model.Role;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RegionService regionService;

    public void addUser(User user) {
        userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(String email) {
        Optional<User> user = getUserByEmail(email);
        user.ifPresent(value -> userRepository.delete(value));
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAllByRoleIsNot(Role.ADMIN);
    }

    public Iterable<User> getWorkerByRegionId(Long id) {
        Region region = regionService.getRegionById(id).orElse(null);
        return userRepository.findAllByRoleAndRegion(Role.SOCIAL_WORKER,region);
    }

    public Iterable<User> getDeputyByRegionId(Long id){
        Region region = regionService.getRegionById(id).orElse(null);
        return userRepository.findAllByRoleAndRegion(Role.DEPUTY,region);
    }
}
