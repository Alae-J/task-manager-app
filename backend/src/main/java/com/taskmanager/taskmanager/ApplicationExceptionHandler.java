package com.taskmanager.taskmanager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.taskmanager.taskmanager.exception.TaskNotFoundException;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<Object> handleTaskNotFound(TaskNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
