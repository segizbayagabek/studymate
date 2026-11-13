package com.studymate.studymate.dto.profile;

import com.studymate.studymate.entity.StudyPlace;

import java.time.LocalDate;

// One study session on the profile's "Recent sessions" list
public record SessionSummary(
        Long groupId,
        String title,
        String subjectName,
        String courseCode,
        StudyPlace place,
        LocalDate meetingDate,
        boolean organized
) {
}
