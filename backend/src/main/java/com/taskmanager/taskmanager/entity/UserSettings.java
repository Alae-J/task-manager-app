package com.taskmanager.taskmanager.entity;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_settings")
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @PositiveOrZero
    @Column(name = "work_duration", columnDefinition = "INT DEFAULT 25")
    private Integer workDuration = 50;

    @PositiveOrZero
    @Column(name = "short_break_duration", columnDefinition = "INT DEFAULT 5")
    private Integer shortBreakDuration = 10;

    @PositiveOrZero
    @Column(name = "long_break_duration", columnDefinition = "INT DEFAULT 15")
    private Integer longBreakDuration = 30;

    @Column(name = "work_color")
    private String workColor = "red";

    @Column(name = "short_break_color")
    private String shortBreakColor = "green";

    @Column(name = "long_break_color")
    private String longBreakColor = "blue";

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    @NonNull
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;
}
