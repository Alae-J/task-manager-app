package com.taskmanager.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.taskmanager.entity.Task;
import com.taskmanager.taskmanager.exception.TaskNotFoundException;
import com.taskmanager.taskmanager.repository.TaskRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Override
    public Task getTask(Long id) {
        return taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, String title, String description, boolean hasPriority) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new TaskNotFoundException(id));
        task.setTitle(title);
        task.setDescription(description);
        task.setHasPriority(hasPriority);
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<Task> getAllTasks() {
        return (List<Task>) taskRepository.findAll();
    }
    
}
