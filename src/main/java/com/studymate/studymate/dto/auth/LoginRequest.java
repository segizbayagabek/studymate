package com.studymate.studymate.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank String studentId,
        @NotBlank String password
) {
}
