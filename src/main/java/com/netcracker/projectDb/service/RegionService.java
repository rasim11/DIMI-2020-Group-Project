package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.Region;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Transactional
@Service
public class RegionService {
    @Autowired
    private RegionRepository regionRepository;
    @Autowired
    private UserService userService;

    public Iterable<Region> getAllRegions() {
        return regionRepository.findAll();
    }

    public void addRegion(Region region) {
        regionRepository.save(region);
    }
    public void addRegions(Iterable<Region> region) {
        regionRepository.saveAll(region);
    }
    public Region getRegionByName(String regName){
        return regionRepository.findByRegionName(regName).get();
    }

    public Optional<Region> getRegionById(Long id) {
        return regionRepository.findById(id);
    }

    public Optional<Region> getRegionByResponsible(String email) {
        User responsible = userService.getUserByEmail(email).orElse(null);
        return regionRepository.findByResponsible(responsible);
    }
}
