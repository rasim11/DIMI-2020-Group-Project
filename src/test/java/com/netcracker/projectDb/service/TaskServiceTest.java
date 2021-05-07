package com.netcracker.projectDb.service;

import com.netcracker.projectDb.model.*;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import static com.netcracker.projectDb.url.UrlTemplates.*;

@SpringBootTest
@AutoConfigureMockMvc
@Slf4j
public class TaskServiceTest  {
    @Mock
    private RestTemplate restTemplate;
    @InjectMocks
    private TaskService taskService;
    @InjectMocks
    @Autowired
    private UserService userService;
    private Task task;


//    public void addTask(Task task) {
//        taskRepository.save(task);
//    }
    
    
    @Before("dsf")
    public void initVal(){
        task = taskService.getTaskById(6L).get();
    }
    @Test
    public void checkResponseType() {
        User resultUser = userService.getUserById(1L).get();
        Assertions.assertAll(
                ()->Assertions.assertEquals(User.class,resultUser.getClass()),
                ()->Assertions.assertEquals(task,restTemplate.getForObject("http://localhost:8082"+URL_GET_TASK_BY_ID,Task.class,6L))
        );
    }

    @Test
    public void getTaskByIdTest() {
        log.info(task.getTaskName());
        Assertions.assertAll(
                ()->Assertions.assertEquals("Расим",userService.getUserById(1L).get().getFirstname())
//                ()->Assertions.assertEquals(task.getTaskName(),restTemplate.getForObject("http://localhost:8082"+URL_GET_TASK_BY_ID,Task.class,6L).getTaskName())
        );
    }
}
