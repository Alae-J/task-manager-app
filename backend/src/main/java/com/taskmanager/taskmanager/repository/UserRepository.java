package com.taskmanager.taskmanager.repository;


import org.springframework.data.repository.CrudRepository;

import com.taskmanager.taskmanager.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserSettingsId(Long userSettingsId);
}
