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
                .antMatchers(API + VERSION + USER_MANAGEMENT + USER_LOGIN,
                        API + VERSION + USER_MANAGEMENT + USER_REGISTRATION).not().fullyAuthenticated()
                .antMatchers(API + VERSION + TASK_MANAGEMENT + TASK_POST).hasAuthority("Пользователь")
                .antMatchers(API + VERSION + ADMIN_MANAGEMENT).hasAuthority("Админ")
                .antMatchers(API + VERSION + PERSONAL_ACCOUNT).hasAnyAuthority("Пользователь",
                "Админ")
                .antMatchers("/resources/**", API + VERSION + MAIN_PAGE,
                        API + VERSION + USER_MANAGEMENT + USER_GET + "/id").permitAll()
                .and()
                .logout()
                .permitAll()
                .logoutSuccessUrl(API + VERSION + MAIN_PAGE);
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
