package com.studymate.studymate.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SendCodeRequest(
        @NotBlank @Pattern(regexp = "\\d{9}", message = "must be a 9-digit student ID") String studentId
) {
}
