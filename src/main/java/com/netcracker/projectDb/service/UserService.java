package com.netcracker.projectDb.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.projectDb.components.Standard;
import com.netcracker.projectDb.model.Municipality;
import com.netcracker.projectDb.model.Region;
import com.netcracker.projectDb.model.Role;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.netcracker.projectDb.url.FilePaths.*;

@Transactional
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RegionService regionService;
    @Autowired
    private MunicipalityService municipalityService;

    public User addUser(User user) {
        return userRepository.save(user);
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
        return userRepository.findAllByRoleAndRegion(Role.SOCIAL_WORKER, region);
    }

    public Iterable<User> getDeputyByRegionId(Long id) {
        Region region = regionService.getRegionById(id).orElse(null);
        return userRepository.findAllByRoleAndRegion(Role.DEPUTY, region);
    }

    public Optional<User> getByUrlAccountConfirm(String url) {
        return userRepository.findByUrlAccountConfirm(url);
    }

    public void addStandards() {
        ObjectMapper mapper = new ObjectMapper();
        Iterable<User> users = mapper.convertValue(Standard.getStandardObjects(PATH_STANDARD_USERS),
                new TypeReference<Iterable<User>>() {
                }
        );

        int i = 0;
        for (User user : users) {
            user.setRegDate(LocalDateTime.now());

            String standardAvatar = Standard.getBase64StandardAvatar(PATH_STANDARD_USER_AVATAR.replace("{i}",
                    Integer.toString(i)));
            user.setUserImage(standardAvatar != null ? standardAvatar :
                    Standard.getBase64StandardAvatar(PATH_DEFAULT_AVATAR));

            Region region = regionService.getRegionByName("Самарская область");
            if (user.getRole().equals(Role.SOCIAL_WORKER) || user.getRole().equals(Role.DEPUTY)) {
                user.setRegion(region);
                addUser(user);
            } else if (user.getRole().equals(Role.RESPONSIBLE)) {
                Municipality municipality = municipalityService.getById(1L).orElse(null);
                user.setMunicipality(municipality);

                region.setResponsible(addUser(user));
                regionService.addRegion(region);
            } else {
                addUser(user);
            }

            i++;
        }
    }
}
