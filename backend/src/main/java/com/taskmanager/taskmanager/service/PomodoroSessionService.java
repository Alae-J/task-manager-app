package com.taskmanager.taskmanager.service;

import java.util.List;

import com.taskmanager.taskmanager.entity.PomodoroSession;

public interface PomodoroSessionService {
    public PomodoroSession savePomodoroSession(Long taskId, PomodoroSession promodoroSession);
    public PomodoroSession getPomodoroSession(Long pomodoroSessionId);
    public PomodoroSession updatePomodoroSession(Long pomodoroSessionId, PomodoroSession pomodoroSession);
    public void deletePomodoroSession(Long pomodoroSessionId);
    public List<PomodoroSession> getTaskPomodoroSessions(Long taskId);
    public List<PomodoroSession> getAllPomodoroSessions();
}
