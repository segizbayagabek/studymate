package com.studymate.studymate.dto.task;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TaskCreateRequest(
        @NotBlank @Size(max = 255) String title,
        @Size(max = 2000) String description
) {
}
