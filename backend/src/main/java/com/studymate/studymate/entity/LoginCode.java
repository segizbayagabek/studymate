package com.studymate.studymate.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

// One-time code we emailed to a student. Only the latest code per email is kept.
@Entity
@Table(name = "login_codes")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LoginCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    // Hashed like a password, so the database never holds the real code
    @Column(nullable = false)
    private String codeHash;

    @Column(nullable = false)
    private Instant sentAt;

    @Column(nullable = false)
    private Instant expiresAt;

    @Column(nullable = false)
    private int wrongAttempts;

    public LoginCode(String email, String codeHash, Instant sentAt, Instant expiresAt) {
        this.email = email;
        this.codeHash = codeHash;
        this.sentAt = sentAt;
        this.expiresAt = expiresAt;
    }

    public void addWrongAttempt() {
        wrongAttempts++;
    }
}
