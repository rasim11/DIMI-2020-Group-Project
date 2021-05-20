package com.netcracker.project;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netcracker.project.model.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
public class TestRequestTaskController {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper mapper;

    @Test
    public void greetingShouldReturnDefaultMessage() throws Exception {
        JsonNode objects =  this.restTemplate.getForObject("http://localhost:" + "8082" + "/api/v1/task-list-get/яма", JsonNode.class);
       List<Task> findTasks =    mapper.convertValue(objects,
                new TypeReference<List<Task>>() {
                }
        );
//       System.out.println("size = " + findTasks.size());
        assertThat(findTasks).isNotNull();
        assertThat(findTasks.size()).isEqualTo(2);
    }
}
