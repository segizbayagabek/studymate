package com.studymate.studymate.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The username shown in the app. Starts as the student ID; the student can change it on the profile.
    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    // Profile: subjects the student studies, each with their level
    @ElementCollection
    @CollectionTable(name = "user_subjects", joinColumns = @JoinColumn(name = "user_id"))
    @OrderColumn(name = "position")
    private List<ProfileSubject> subjects = new ArrayList<>();

    // Profile: QUIET_WORK, MIXED_GROUP or TALKATIVE (empty until the student picks one)
    @Enumerated(EnumType.STRING)
    private StudyPreference studyStyle;

    // Profile: places the student likes to study in
    @ElementCollection
    @CollectionTable(name = "user_places", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "place", nullable = false)
    private Set<StudyPlace> favouritePlaces = new HashSet<>();

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // The email is always <studentId>@sdu.edu.kz
    public String getStudentId() {
        return email.substring(0, email.indexOf('@'));
    }
}
