package com.taskmanager.taskmanager.service;

import java.util.List;

import com.taskmanager.taskmanager.entity.User;

public interface UserService {
    public User saveUser(User user);
    public User getUser(Long userId);
    public User updateUser(Long userId, User user);
    public void deleteUser(Long userId);
    public List<User> getAllUsers();
}
