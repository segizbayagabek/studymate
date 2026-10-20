package com.studymate.studymate.dto.task;

import com.studymate.studymate.entity.TaskStatus;

public record TaskResponse(
        Long id,
        String title,
        String description,
        TaskStatus status,
        Long courseId
) {
}
