package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.Municipality;
import com.netcracker.projectDb.repository.MunicipalityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MunicipalityService {
    @Autowired
    private MunicipalityRepository municipalityRepository;

    public void save(Municipality municipality) {
        municipalityRepository.save(municipality);
    }

    public Iterable<Municipality> getAll() {
        return municipalityRepository.findAll();
    }

    public Optional<Municipality> getById(Long id) {
        return municipalityRepository.findById(id);
    }
}
