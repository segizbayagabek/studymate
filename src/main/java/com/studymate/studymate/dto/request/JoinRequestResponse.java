package com.studymate.studymate.dto.request;

import com.studymate.studymate.dto.user.UserSummary;
import com.studymate.studymate.entity.GroupStatus;
import com.studymate.studymate.entity.JoinRequestStatus;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyPreference;

import java.time.Instant;
import java.time.LocalTime;
import java.util.Set;

public record JoinRequestResponse(
        Long id,
        Long groupId,
        String groupTitle,
        String groupCourseCode,
        GroupStatus groupStatus,
        UserSummary applicant,
        String courseCode,
        KnowledgeLevel level,
        LocalTime availableFrom,
        LocalTime availableTo,
        Set<StudyPreference> preferences,
        String note,
        int score,
        ScoreBreakdown breakdown,
        JoinRequestStatus status,
        Instant createdAt,
        Instant decidedAt
) {
}
