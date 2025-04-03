package com.taskmanager.taskmanager.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.taskmanager.taskmanager.security.filter.JwtAuthenticationFilter;
import com.taskmanager.taskmanager.security.service.UserAuthService;

// Tells Spring this class provides beans and security config
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired UserAuthService userAuthService;

    // Defines the security filter chain: who can access what, how requests are handled
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // or else the browser would block any request before it even reaches your controller
            .and()
            // Disable CSRF because we're using a stateless REST API (not form submissions)
            .csrf().disable()
            // Define which routes are public and which need authentication
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    // Allow unauthenticated access to all /auth/** endpoints (like login/register)
                    .requestMatchers("/auth/**").permitAll()
                    // All other endpoints require authentication
                    .anyRequest().authenticated()
            )
            // Make the app stateless: no sessions, no cookies, every request must be authenticated
            .sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .userDetailsService(userAuthService);
        // Plug in our custom JWT filter BEFORE Spring's default login filter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Define the password encoder bean to hash and verify passwords (BCrypt with strength 12)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    // Define the authentication manager bean for manual authentication (e.g. in login service)
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder, UserAuthService userAuthService) throws Exception {
        // Link the authentication manager to our custom UserDetailsService and encoder
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userAuthService) // tells Spring where to fetch user info from
                .passwordEncoder(passwordEncoder)    // tells Spring how to validate the password
                .and()
                .build();                            // build the AuthenticationManager
    }
}