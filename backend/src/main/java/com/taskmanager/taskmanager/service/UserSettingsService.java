package com.taskmanager.taskmanager.service;

import java.util.List;

import com.taskmanager.taskmanager.entity.UserSettings;
public interface UserSettingsService {

    public UserSettings saveUserSettings(Long userId, UserSettings userSettings);
    public UserSettings getUserSettings(Long userSettingsId);
    public UserSettings getUserUserSettings(Long userId);
    public UserSettings updateUserSettings(Long userSettingsId, UserSettings userSettings);
    public void deleteUserSettings(Long userSettingsId);
    public List<UserSettings> getAllUserSettings();
}
