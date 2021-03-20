package com.netcracker.project.config;


import com.netcracker.project.service.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static com.netcracker.project.url.UrlTemplates.*;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailsServiceImpl userService;
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers(
                        LOCAL_URL_USER_LOGIN,
                        LOCAL_URL_USER_REGISTRATION).not().fullyAuthenticated()
                .antMatchers(LOCAL_URL_POST_TASK,LOCAL_URL_UPDATE_TASK_BY_ID).hasAuthority("Пользователь")
                .antMatchers(
                        LOCAL_URL_ADMINISTRATION,
                        LOCAL_URL_USER_ROLE_EDIT,
                        LOCAL_URL_USER_REGISTRATION_ADMIN).hasAuthority("Админ")
                .antMatchers(LOCAL_URL_RESPONSIBLE_PUT_TASK).hasAuthority("Ответственный")
                .antMatchers(LOCAL_URL_PERSONAL_ACCOUNT).fullyAuthenticated()
                .antMatchers(
                        "/resources/**",
                        LOCAL_URL_MAIN_PAGE,
                        LOCAL_URL_USER_PROFILE,
                        LOCAL_URL_GET_TASK_BY_ID).permitAll()
                .and()
                .logout()
                .permitAll()
                .logoutSuccessUrl(LOCAL_URL_MAIN_PAGE);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder());
    }
}
