package com.netcracker.projectDb.components;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.projectDb.service.MunicipalityService;
import com.netcracker.projectDb.service.RegionService;
import com.netcracker.projectDb.service.TaskService;
import com.netcracker.projectDb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

@Component
public class Standard {
    @Autowired
    private RegionService regionService;
    @Autowired
    private UserService userService;
    @Autowired
    private MunicipalityService municipalityService;
    @Autowired
    private TaskService taskService;

    @EventListener(ApplicationReadyEvent.class)
    public void addStandardObjects() {
        municipalityService.addStandards();
        regionService.addStandards();
        userService.addStandards();
        taskService.addStandard();

        System.out.println("Standard data added!");
    }

    public static JsonNode getStandardObjects(String url) {
        ObjectMapper mapper = new ObjectMapper();
        File from = new File(url);

        try {
            return mapper.readTree(from);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public static String getBase64StandardAvatar(String url) {
        try {
            return "data:image/png;base64," +
                    Base64.getEncoder().encodeToString(Files.readAllBytes(Paths.get(url)));
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
