package com.taskmanager.taskmanager.entity;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NonNull
    @NotBlank(message = "Name cannot be blank!")
    @Size(max = 100, message = "Name cannot exceed 100 characters.")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @NonNull
    @NotBlank(message = "Email cannot be blank!")
    @Email(message = "Email should be valid.")
    @Size(max = 100, message = "Email cannot exceed 100 characters.")
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @NonNull
    @NotBlank(message = "Password cannot be blank!")
    @Size(max = 255, message = "Password hash cannot exceed 255 characters.")
    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = false)
    private UserSettings userSettings;
}
