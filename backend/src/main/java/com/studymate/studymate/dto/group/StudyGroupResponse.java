package com.studymate.studymate.dto.group;

import com.studymate.studymate.dto.user.UserSummary;
import com.studymate.studymate.entity.GroupStatus;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyPlace;
import com.studymate.studymate.entity.StudyPreference;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

public record StudyGroupResponse(
        Long id,
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
        int groupSize,
        int memberCount,
        int seatsLeft,
        GroupStatus status,
        UserSummary organizer,
        Instant createdAt
) {
}
