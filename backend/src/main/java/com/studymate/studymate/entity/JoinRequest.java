package com.studymate.studymate.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalTime;
import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "join_requests")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JoinRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private StudyGroup group;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "applicant_id", nullable = false)
    private User applicant;

    // Applicant's answers

    @Column(nullable = false)
    private String courseCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private KnowledgeLevel level;

    @Column(nullable = false)
    private LocalTime availableFrom;

    @Column(nullable = false)
    private LocalTime availableTo;

    @ElementCollection
    @CollectionTable(name = "join_request_preferences", joinColumns = @JoinColumn(name = "request_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "preference", nullable = false)
    private Set<StudyPreference> preferences = new HashSet<>();

    @Column(length = 500)
    private String note;

    // Compatibility, each part is 0-100

    @Column(nullable = false)
    private int score;

    @Column(nullable = false)
    private int subjectScore;

    @Column(nullable = false)
    private int timeScore;

    @Column(nullable = false)
    private int levelScore;

    @Column(nullable = false)
    private int preferenceScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JoinRequestStatus status;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    private Instant decidedAt;

    public JoinRequest(
            StudyGroup group,
            User applicant,
            String courseCode,
            KnowledgeLevel level,
            LocalTime availableFrom,
            LocalTime availableTo,
            Set<StudyPreference> preferences,
            String note,
            CompatibilityScore compatibility) {

        this.group = group;
        this.applicant = applicant;
        this.courseCode = courseCode;
        this.level = level;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
        this.preferences = preferences == null || preferences.isEmpty()
                ? new HashSet<>()
                : new HashSet<>(EnumSet.copyOf(preferences));
        this.note = note;
        this.score = compatibility.total();
        this.subjectScore = compatibility.subject();
        this.timeScore = compatibility.time();
        this.levelScore = compatibility.level();
        this.preferenceScore = compatibility.preferences();
        this.status = JoinRequestStatus.PENDING;
        this.createdAt = Instant.now();
    }

    public void accept() {
        decide(JoinRequestStatus.ACCEPTED);
    }

    public void reject() {
        decide(JoinRequestStatus.REJECTED);
    }

    public void cancel() {
        decide(JoinRequestStatus.CANCELLED);
    }

    private void decide(JoinRequestStatus newStatus) {
        this.status = newStatus;
        this.decidedAt = Instant.now();
    }
}
