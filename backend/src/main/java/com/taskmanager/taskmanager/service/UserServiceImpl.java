package com.taskmanager.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskmanager.taskmanager.entity.User;
import com.taskmanager.taskmanager.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    UserRepository userRepository;

    @Override
    public User register(User user) {
        return userRepository.save(user);
    }

    @Override
    public User saveUser(User user) {
        User actualUser = userRepository.findByEmail(user.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException(user.getEmail()));
        actualUser.setTasks(user.getTasks());
        return userRepository.save(actualUser);
    }

    @Override
    public User getUser(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("No matching id on the db...applicationExceptionHandler"));
    }

    @Override
    public User updateUser(Long userId, User user) {
        User actualUser = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("No matching id on the db...applicationExceptionHandler"));
        actualUser.setEmail(user.getEmail());
        actualUser.setPasswordHash(user.getPasswordHash());
        actualUser.setCreatedAt(user.getCreatedAt());
        actualUser.setUpdatedAt(user.getUpdatedAt());
        return userRepository.save(actualUser);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.delete(userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("No matching id on the db...applicationExceptionHandler")));
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }
    
}
