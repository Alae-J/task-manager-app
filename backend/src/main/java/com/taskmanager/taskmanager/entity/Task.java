package com.taskmanager.taskmanager.entity;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "task")
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NonNull
    @NotBlank(message = "Title cannot be blank!")
    @Column(name = "title", nullable = false)
    private String title;

    @NonNull
    @NotBlank(message = "Description cannot be blank!")
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "hasPriority", columnDefinition = "TinyInt(1) DEFAULT 0")
    private boolean hasPriority;
}
