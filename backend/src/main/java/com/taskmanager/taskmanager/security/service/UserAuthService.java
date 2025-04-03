package com.taskmanager.taskmanager.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.taskmanager.taskmanager.entity.User;
import com.taskmanager.taskmanager.repository.UserRepository;

// This class implements the UserDetailsService, which is required by Spring Security
// to load user-specific data during authentication.
// This class is basically Spring Security's bridge to our user database.
@Service
public class UserAuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // This method is called automatically by Spring Security whenever a user attempts to log in
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Fetch the user from the DB based on the username (email in this case)
        // This username is usually what the user typed into the login form
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));
        // Handles user is not found
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        // If user is found, we convert our custom User entity into Spring Security's built-in UserDetails object
        // This object tells Spring Security:
        // - what username the user has (user.getUsername())
        // - what their hashed password is (user.getPasswordHash())
        // - what roles or permissions they have (in this case: just "ROLE_USER")
        return org.springframework.security.core.userdetails.User.builder()
                .username(username) // Uses the username (email) as an identifier
                .password(user.getPasswordHash()) // Uses the hashed password stored in the DB
                .authorities("ROLE_USER") // Hardcoded role, since we don't have a Role entity in this project
                .build();
    }

    
}