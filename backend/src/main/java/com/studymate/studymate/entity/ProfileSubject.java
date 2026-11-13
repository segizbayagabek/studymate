package com.studymate.studymate.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

// One subject on a student's profile, e.g. "Calculus II" (MATH 161) at INTERMEDIATE level
@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileSubject {

    @Column(nullable = false)
    private String subjectName;

    @Column(nullable = false)
    private String courseCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private KnowledgeLevel level;
}
