package com.taskmanager.taskmanager.repository;

import org.springframework.data.repository.CrudRepository;

import com.taskmanager.taskmanager.entity.Task;

public interface TaskRepository extends CrudRepository<Task, Long> {

}
