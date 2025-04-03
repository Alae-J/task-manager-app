// This is our custom filter that runs ONCE per request to handle JWT authentication
package com.taskmanager.taskmanager.security.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.taskmanager.taskmanager.security.service.JwtService;
import com.taskmanager.taskmanager.security.service.UserAuthService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Tell Spring this class is a component (so it gets auto-detected)
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Used to extract info and validate tokens
    @Autowired
    private JwtService jwtService;

    // Used to load user info from DB
    @Autowired
    private UserAuthService userAuthService;

    // This is the main method that gets triggered for every HTTP request
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Step 1: Get the Authorization header from the request
        String authorizationHeader = request.getHeader("Authorization");
        // Variables to hold extracted token and username
        String username = null;
        String jwt = null;

        // Step 2: Check if header exists and starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            // Remove the "Bearer " prefix and keep only the token
            jwt = authorizationHeader.substring(7);
            // Use the JWT service to extract the username (email) from the token
            username = jwtService.getUsernameFromToken(jwt);
        }

        // Step 3: If username was successfully extracted and no one is authenticated yet for this request
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from DB using the extracted username
            UserDetails userDetails = userAuthService.loadUserByUsername(username);
            // Step 4: Validate the token (is it not expired? was it tampered with?)
            if (jwtService.isTokenValid(jwt)) {
                // Step 5: Create an Authentication object that Spring Security can understand
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, // principal (user info)
                    null, // credentials (null because we're not checking password here)
                    userDetails.getAuthorities() // roles/permissions
                );
                // Step 6: Add extra request-specific details like IP address, session ID, etc.
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Step 7: Mark this user as authenticated for this request
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        // Step 8: Continue the request and pass control to the next filter (or controller)
        filterChain.doFilter(request, response);
    }
}