package com.netcracker.projectDb.repository;

import com.netcracker.projectDb.model.Region;
import com.netcracker.projectDb.model.User;
import org.springframework.data.repository.CrudRepository;

import javax.validation.constraints.Null;
import java.util.Optional;

public interface RegionRepository extends CrudRepository<Region, Long> {
    Optional<Region> findByResponsible(@Null User responsible);
    Optional<Region> findByRegionName(@Null String regName);
}
