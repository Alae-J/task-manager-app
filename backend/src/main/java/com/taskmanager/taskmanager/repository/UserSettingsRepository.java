package com.taskmanager.taskmanager.repository;

import org.springframework.data.repository.CrudRepository;

import com.taskmanager.taskmanager.entity.UserSettings;

public interface UserSettingsRepository extends CrudRepository<UserSettings, Long> {
    UserSettings findByUserId(Long userId);
}
