package com.netcracker.project;

import com.netcracker.project.model.Task;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static com.netcracker.project.url.UrlTemplates.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.*;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@WithUserDetails("rmiralibekov@gmail.com")
public class AuthenticatedTests {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void authenticatedTest() throws Exception {
        this.mockMvc.perform(get(LOCAL_URL_MAIN_PAGE))
                .andDo(print())
                .andExpect(authenticated());
//                .andExpect(xpath("//*[@id=\"div-hidden-problems-menu\"]/button/span").string("Расим"));

    }

    @Test
    public void createTask() throws Exception {
        this.mockMvc.perform(get(LOCAL_URL_POST_TASK))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void postTask() throws Exception {
        this.mockMvc.perform(get(LOCAL_URL_GET_TASK_BY_ID,6L))
                .andDo(print())
                .andExpect(status().isOk());

    }


}
