package com.example.coachescorner.config;

import com.example.coachescorner.services.UserDetailsLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private UserDetailsLoader usersLoader;

    public SecurityConfiguration(UserDetailsLoader usersLoader) {
        this.usersLoader = usersLoader;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    // for now this allowed everyone to move around the app
//    @Bean
//    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests()
//                .anyRequest().permitAll()
//                .and().formLogin().loginPage("/").defaultSuccessUrl("/home")
//                .and().httpBasic();
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                /* Login configuration */
                    .formLogin()
                    .loginPage("/login")
                    .defaultSuccessUrl("/home") // user's home page, it can be any URL
                    .permitAll() // Anyone can go to the login page
                    /* Logout configuration */
                .and()
                    .logout()
                    .logoutSuccessUrl("/") // append a query string value
                    /* Pages that can be viewed without having to log in */
                    /* Pages that require authentication */
                .and()
                    .authorizeHttpRequests()
                    .requestMatchers("/", "/register", "/login", "/css/**", "/js/**", "/img/**", "/about") // anyone can see home, the ads pages, and sign up
                    .permitAll()
                .and()
                    .authorizeHttpRequests()
                    .requestMatchers(
                            "/home", // only authenticated users can create ads
                            "/client", "/edit/{id}", "/client-edit/{id}", "/users/search", "/add-injury/{id}", "/add-injury/**", "/injury/edit/{id}", "/injury/delete/{id}", "/client-false/{id}", "/api/user/**" , "/api/user" // only authenticated users can edit ads
                    )
                    .authenticated()
        ;
        return http.build();
    }

}
