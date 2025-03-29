package com.taskmanager.taskmanager.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.taskmanager.entity.UserSettings;
import com.taskmanager.taskmanager.service.UserSettingsService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
@RestController
@RequestMapping("/settings")
public class UserSettingsController {

    @Autowired
    UserSettingsService userSettingsService;

    @GetMapping("/all")
    public ResponseEntity<List<UserSettings>> getAllUserSettings() {
        return new ResponseEntity<>(userSettingsService.getAllUserSettings(), HttpStatus.OK);
    }

    @GetMapping("/{userSettingsId}")
    public ResponseEntity<UserSettings> getUserSettings(@PathVariable Long userSettingsId) {
        return new ResponseEntity<>(userSettingsService.getUserSettings(userSettingsId), HttpStatus.OK);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserSettings> getUserUserSettings(@PathVariable Long userId) {
        return new ResponseEntity<>(userSettingsService.getUserUserSettings(userId), HttpStatus.OK);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<UserSettings> addUserSettings(@Valid @RequestBody UserSettings userSettings, @PathVariable Long userId) {
        return new ResponseEntity<>(userSettingsService.saveUserSettings(userId, userSettings), HttpStatus.OK);
    }

    @PutMapping("/user/{userSettingsId}")
    public ResponseEntity<UserSettings> updateUserSettings(@PathVariable Long userSettingsId, @RequestBody @Valid UserSettings userSettings) {
        return new ResponseEntity<>(userSettingsService.updateUserSettings(userSettingsId, userSettings), HttpStatus.OK);
    }

    @DeleteMapping("/{userSettingsId}")
    public ResponseEntity<HttpStatus> deleteUserSettings(@PathVariable Long userSettingsId) {
        userSettingsService.deleteUserSettings(userSettingsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
