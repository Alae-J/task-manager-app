package com.taskmanager.taskmanager.exception;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long id) {
        super("The task with id " + id + " does not exist in our records!");
    }
}
