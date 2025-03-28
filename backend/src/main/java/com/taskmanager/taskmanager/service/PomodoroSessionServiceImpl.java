package com.taskmanager.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.taskmanager.entity.PomodoroSession;
import com.taskmanager.taskmanager.repository.PomodoroSessionRepository;
import com.taskmanager.taskmanager.repository.TaskRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class PomodoroSessionServiceImpl implements PomodoroSessionService {
    @Autowired
    PomodoroSessionRepository pomodoroSessionRepository;

    @Autowired
    TaskRepository taskRepository;

    public PomodoroSession savePomodoroSession(Long taskId, PomodoroSession pomodoroSession) {
        pomodoroSession.setTask(taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("No matching task on the db...")));
        return pomodoroSessionRepository.save(pomodoroSession);
    }

    @Override
    public PomodoroSession getPomodoroSession(Long pomodoroSessionId) {
        return pomodoroSessionRepository.findById(pomodoroSessionId)
            .orElseThrow(() -> new RuntimeException("No matching ID on the db..."));
    }

    @Override
    public PomodoroSession updatePomodoroSession(Long pomodoroSessionId, PomodoroSession pomodoroSession) {
        PomodoroSession actualPomodoroSession = pomodoroSessionRepository.findById(pomodoroSessionId)
            .orElseThrow(() -> new RuntimeException("No matching ID on the db..."));
        actualPomodoroSession.setSessionType(pomodoroSession.getSessionType());
        actualPomodoroSession.setStartTime(pomodoroSession.getStartTime());
        actualPomodoroSession.setEndTime(pomodoroSession.getEndTime());
        actualPomodoroSession.setDuration(pomodoroSession.getDuration());
        actualPomodoroSession.setActive(pomodoroSession.isActive());
        actualPomodoroSession.setCreatedAt(pomodoroSession.getCreatedAt());
        return pomodoroSessionRepository.save(actualPomodoroSession);
    }

    @Override
    public void deletePomodoroSession(Long pomodoroSessionId) {
        pomodoroSessionRepository.deleteById(pomodoroSessionId);
    }

    @Override
    public List<PomodoroSession> getTaskPomodoroSessions(Long taskId) {
        return pomodoroSessionRepository.findAllByTaskId(taskId);
    }

    @Override
    public List<PomodoroSession> getAllPomodoroSessions() {
        return (List<PomodoroSession>) pomodoroSessionRepository.findAll();
    }
}
