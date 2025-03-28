package com.taskmanager.taskmanager.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.taskmanager.taskmanager.entity.Task;

public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findAllByUserId(Long userId);
}
