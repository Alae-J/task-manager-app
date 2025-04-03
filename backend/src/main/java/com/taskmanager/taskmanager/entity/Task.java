package com.taskmanager.taskmanager.entity;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NonNull
    @NotBlank(message = "Title cannot be blank!")
    @Size(max = 255, message = "Title cannot exceed 255 characters.")
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @NonNull
    @NotBlank(message = "Description cannot be blank!")
    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "priority")
    private boolean hasPriority;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "estimated_time", columnDefinition = "INT DEFAULT 0")
    private Integer estimatedTime;

    // for future use
    @Column(name = "completed")
    private boolean completed;

    @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'TO_DO'")
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "sessionsCount")
    private Integer sessionsCount;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.sessionsCount = 0;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
