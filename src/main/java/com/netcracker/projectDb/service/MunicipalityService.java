package com.netcracker.projectDb.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.projectDb.components.Standard;
import com.netcracker.projectDb.model.Municipality;
import com.netcracker.projectDb.repository.MunicipalityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.netcracker.projectDb.url.FilePaths.PATH_STANDARD_MUNICIPALITIES;

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

    public void addStandards() {
        ObjectMapper mapper = new ObjectMapper();
        Iterable<Municipality> municipalities = mapper.convertValue(Standard.getStandardObjects(PATH_STANDARD_MUNICIPALITIES),
                new TypeReference<Iterable<Municipality>>() {
                }
        );

        municipalityRepository.saveAll(municipalities);
    }
}
