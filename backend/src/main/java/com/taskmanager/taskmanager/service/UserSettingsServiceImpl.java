package com.taskmanager.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.taskmanager.entity.User;
import com.taskmanager.taskmanager.entity.UserSettings;
import com.taskmanager.taskmanager.repository.UserRepository;
import com.taskmanager.taskmanager.repository.UserSettingsRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserSettingsServiceImpl implements UserSettingsService {
    
    @Autowired
    UserSettingsRepository userSettingsRepository;

    @Autowired
    UserRepository userRepository;
    
    @Override
    public UserSettings saveUserSettings(Long userId, UserSettings userSettings) {
        userSettings.setUser(userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("No matching ID on the db...")));
        return userSettingsRepository.save(userSettings);
    }

    @Override
    public UserSettings getUserSettings(Long userSettingsId) {
        return userSettingsRepository.findById(userSettingsId)
            .orElseThrow(() -> new RuntimeException("No matching ID on the db..."));
    }

    @Override
    public UserSettings getUserUserSettings(Long userId) {
        return userSettingsRepository.findByUserId(userId);
    }

    @Override
    public UserSettings updateUserSettings(Long userId, UserSettings userSettings) {
        User actualUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("No matching ID on the db..."));
        UserSettings actualUserSettings = actualUser.getUserSettings();
        actualUserSettings.setWorkDuration(userSettings.getWorkDuration());
        actualUserSettings.setShortBreakDuration(userSettings.getShortBreakDuration());
        actualUserSettings.setLongBreakDuration(userSettings.getLongBreakDuration());
        actualUserSettings.setWorkColor(userSettings.getWorkColor());
        actualUserSettings.setShortBreakColor(userSettings.getShortBreakColor());
        actualUserSettings.setLongBreakColor(userSettings.getLongBreakColor());
        return userSettingsRepository.save(actualUserSettings);
    }

    @Override
    public void deleteUserSettings(Long userSettingsId) {
        UserSettings actualUserSettings = userSettingsRepository.findById(userSettingsId)
            .orElseThrow(() -> new RuntimeException("No matching ID on the db..."));
        userRepository.findByUserSettingsId(userSettingsId).setUserSettings(null);;
        userSettingsRepository.delete(actualUserSettings);
    }

    @Override
    public List<UserSettings> getAllUserSettings() {
        return (List<UserSettings>) userSettingsRepository.findAll();
    }
    
}
