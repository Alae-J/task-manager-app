package com.taskmanager.taskmanager.service;

import java.util.List;

import com.taskmanager.taskmanager.entity.Task;

public interface TaskService {
    Task getTask(Long id);
    Task saveTask(Long userId, Task task);
    Task updateTask(Long id, Task task);
    void deleteTask(Long id);
    List<Task> getUserTasks(Long userId);
    List<Task> getAllTasks();
}
