package com.taskmanager.taskmanager.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.taskmanager.taskmanager.entity.PomodoroSession;

public interface PomodoroSessionRepository extends CrudRepository<PomodoroSession, Long> {
    List<PomodoroSession> findAllByTaskId(Long taskId);
}
