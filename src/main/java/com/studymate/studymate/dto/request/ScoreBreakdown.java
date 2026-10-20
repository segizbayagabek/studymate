package com.studymate.studymate.dto.request;

public record ScoreBreakdown(
        int subject,
        int time,
        int level,
        int preferences
) {
}
