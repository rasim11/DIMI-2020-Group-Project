package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.Region;
import com.netcracker.projectDb.model.Role;
import com.netcracker.projectDb.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Iterable<User> findAllByRoleIsNot(Role role);

    Iterable<User> findAllByRegion(Region region);

    Iterable<User> findAllByRoleAndRegion(Role role, Region region);

    Optional<User> findByUrlAccountConfirm(String urlAccountConfirm);
}
