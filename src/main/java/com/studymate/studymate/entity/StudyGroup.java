package com.studymate.studymate.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "study_groups")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private String subjectName;

    @Column(nullable = false)
    private String courseCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StudyPlace place;

    // Visible only to the organizer and accepted members
    private String exactSpot;

    @Column(nullable = false)
    private LocalDate meetingDate;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private KnowledgeLevel level;

    @ElementCollection
    @CollectionTable(name = "study_group_preferences", joinColumns = @JoinColumn(name = "group_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "preference", nullable = false)
    private Set<StudyPreference> preferences = new HashSet<>();

    // Total size including the organizer
    @Column(nullable = false)
    private int groupSize;

    // Accepted members, organizer not included
    @Column(nullable = false)
    private int memberCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GroupStatus status;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    // Guards against two concurrent accepts taking the last seat
    @Version
    private Long version;

    public StudyGroup(
            User organizer,
            String title,
            String description,
            String subjectName,
            String courseCode,
            StudyPlace place,
            String exactSpot,
            LocalDate meetingDate,
            LocalTime startTime,
            LocalTime endTime,
            KnowledgeLevel level,
            Set<StudyPreference> preferences,
            int groupSize) {

        this.organizer = organizer;
        this.title = title;
        this.description = description;
        this.subjectName = subjectName;
        this.courseCode = courseCode;
        this.place = place;
        this.exactSpot = exactSpot;
        this.meetingDate = meetingDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.level = level;
        this.preferences = preferences == null || preferences.isEmpty()
                ? new HashSet<>()
                : new HashSet<>(EnumSet.copyOf(preferences));
        this.groupSize = groupSize;
        this.memberCount = 0;
        this.status = GroupStatus.OPEN;
        this.createdAt = Instant.now();
    }

    public int getSeatsLeft() {
        return groupSize - 1 - memberCount;
    }

    public boolean isOrganizer(Long userId) {
        return organizer.getId().equals(userId);
    }

    public void addMember() {
        memberCount++;
        if (getSeatsLeft() == 0) {
            status = GroupStatus.FULL;
        }
    }

    public void cancel() {
        status = GroupStatus.CANCELLED;
    }
}
