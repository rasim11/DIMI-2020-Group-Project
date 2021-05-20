package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.Region;
import com.netcracker.projectDb.model.User;
import com.netcracker.projectDb.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Optional;

import static com.netcracker.projectDb.url.FilePaths.PATH_STANDARD_REGIONS;

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

    public Region getRegionByName(String regName) {
        return regionRepository.findByRegionName(regName).orElse(null);
    }

    public Optional<Region> getRegionById(Long id) {
        return regionRepository.findById(id);
    }

    public Optional<Region> getRegionByResponsible(String email) {
        User responsible = userService.getUserByEmail(email).orElse(null);
        return regionRepository.findByResponsible(responsible);
    }

    public void addStandards() {
        try (BufferedReader reader = new BufferedReader(new
                FileReader(PATH_STANDARD_REGIONS))) {
            String line = reader.readLine();
            while (line != null) {
                if (getRegionByName(line) == null) {
                    Region region = new Region(null, line, null);
                    addRegion(region);
                }

                line = reader.readLine();
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
