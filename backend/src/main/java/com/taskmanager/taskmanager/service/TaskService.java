package com.taskmanager.taskmanager.service;

import java.util.List;

import com.taskmanager.taskmanager.entity.Task;

public interface TaskService {
    Task getTask(Long id);
    Task saveTask(Task task);
    Task updateTask(Long id, String title, String description, boolean hasPriority);
    void deleteTask(Long id);
    List<Task> getAllTasks();
}
