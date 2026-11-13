package com.studymate.studymate.dto.profile;

import jakarta.validation.constraints.NotBlank;

public record UsernameUpdateRequest(
        @NotBlank String name
) {
}
