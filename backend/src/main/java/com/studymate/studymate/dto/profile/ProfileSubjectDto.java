package com.studymate.studymate.dto.profile;

import com.studymate.studymate.entity.KnowledgeLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProfileSubjectDto(
        @NotBlank @Size(max = 255) String subjectName,
        @NotBlank @Size(max = 32) String courseCode,
        @NotNull(message = "pick a level for every subject") KnowledgeLevel level
) {
}
