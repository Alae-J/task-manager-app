package com.taskmanager.taskmanager.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.taskmanager.service.PomodoroSessionService;
import com.taskmanager.taskmanager.entity.PomodoroSession;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;




@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@RestController
@RequestMapping("/pomodoro")
public class PomodoroSessionController {

    @Autowired
    PomodoroSessionService pomodoroSessionService;
    
    @GetMapping("{pomodoroSessionId}")
    public ResponseEntity<PomodoroSession> getPomodoroSession(@PathVariable Long pomodoroSessionId) {
        return new ResponseEntity<>(pomodoroSessionService.getPomodoroSession(pomodoroSessionId), HttpStatus.OK);
    }
    
    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<PomodoroSession>> getTaskPomodoroSessions(@PathVariable Long taskId) {
        return new ResponseEntity<>(pomodoroSessionService.getTaskPomodoroSessions(taskId), HttpStatus.OK);
    }

    @GetMapping("/task/{taskId}/latest")
    public ResponseEntity<PomodoroSession> getLatestSession(@PathVariable Long taskId) {
        return new ResponseEntity<>(pomodoroSessionService.getLatestSession(taskId), HttpStatus.OK);
    }

    @GetMapping("/task/{taskId}/timeSpent")
    public ResponseEntity<Integer> getTimeSpent(@PathVariable Long taskId) {
        return new ResponseEntity<>(pomodoroSessionService.calculateTimeSpent(taskId), HttpStatus.OK);
    }

    
    @GetMapping("/all")
    public ResponseEntity<List<PomodoroSession>> getAllPomodoroSessions() {
        return new ResponseEntity<>(pomodoroSessionService.getAllPomodoroSessions(), HttpStatus.OK);
    }

    @PostMapping("/task/{taskId}")
    public ResponseEntity<PomodoroSession> addPomodoroToTask(@Valid @RequestBody PomodoroSession pomodoroSession, @PathVariable Long taskId) {
        return new ResponseEntity<>(pomodoroSessionService.savePomodoroSession(taskId, pomodoroSession), HttpStatus.OK);
    }

    @PutMapping("/{pomodoroSessionId}")
    public ResponseEntity<PomodoroSession> updatePomodoroSession(@PathVariable Long pomodoroSessionId, @Valid @RequestBody PomodoroSession pomodoroSession) {
        return new ResponseEntity<>(pomodoroSessionService.updatePomodoroSession(pomodoroSessionId, pomodoroSession), HttpStatus.OK);
    }

    @DeleteMapping("/{pomodoroSessionId}")
    public ResponseEntity<HttpStatus> deletePomodoroSession(@PathVariable Long pomodoroSessionId) {
        pomodoroSessionService.deletePomodoroSession(pomodoroSessionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
