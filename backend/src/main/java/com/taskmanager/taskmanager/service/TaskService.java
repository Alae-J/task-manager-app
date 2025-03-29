package com.taskmanager.taskmanager.service;

import java.util.List;

import com.taskmanager.taskmanager.entity.Task;

public interface TaskService {
    Task getTask(Long taskId);
    Task saveTask(Long userId, Task task);
    Task updateTask(Long taskId, Task task);
    void deleteTask(Long taskId);
    List<Task> getUserTasks(Long userId);
    List<Task> getAllTasks();
}
