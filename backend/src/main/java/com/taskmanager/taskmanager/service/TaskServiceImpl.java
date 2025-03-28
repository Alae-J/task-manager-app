package com.taskmanager.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.taskmanager.entity.Task;
import com.taskmanager.taskmanager.exception.TaskNotFoundException;
import com.taskmanager.taskmanager.repository.TaskRepository;
import com.taskmanager.taskmanager.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Task getTask(Long id) {
        return taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public Task saveTask(Long userId, Task task) {
        task.setUser(userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("No matching user on the db..."))
        );
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task task) {
        Task actualTask = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
        actualTask.setTitle(task.getTitle());
        actualTask.setDescription(task.getDescription());
        actualTask.setHasPriority(task.isHasPriority());
        actualTask.setDueDate(task.getDueDate());
        actualTask.setEstimatedTime(task.getEstimatedTime());
        actualTask.setTimeSpent(task.getTimeSpent());
        actualTask.setCompleted(task.isCompleted());
        actualTask.setStatus(task.getStatus());
        return taskRepository.save(actualTask);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<Task> getUserTasks(Long userId) {
        return taskRepository.findAllByUserId(userId);
    }

    @Override
    public List<Task> getAllTasks() {
        return (List<Task>) taskRepository.findAll();
    }
    
}
