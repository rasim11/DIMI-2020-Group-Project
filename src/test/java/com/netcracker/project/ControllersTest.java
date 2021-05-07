package com.netcracker.project;

import com.netcracker.project.model.User;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import static com.netcracker.project.url.UrlTemplates.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ControllersTest {
    @Mock
    private RestTemplate restTemplate;
    @Autowired
    private MockMvc mockMvc;
    @Test
    public  void loginTest() throws Exception{
        this.mockMvc.perform(formLogin(LOCAL_URL_USER_LOGIN).user("").password(""))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }
    @Test
    public void correctLoginTest() throws Exception {
        this.mockMvc.perform(formLogin(LOCAL_URL_USER_LOGIN).user("email","rmiralibekov@gmail.com").password("Mir_201263"))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl(LOCAL_URL_MAIN_PAGE));

    }

    @Test
    public void editTask() throws Exception {
        this.mockMvc.perform(get(LOCAL_URL_POST_TASK))
                .andDo(print())
                .andExpect(status().is4xxClientError());

    }

    @Test
    public void userProfile() throws Exception {
        this.mockMvc.perform(get(LOCAL_URL_USER_ROLE_EDIT,1L))
                .andDo(print())
                .andExpect(status().is4xxClientError());

    }
}