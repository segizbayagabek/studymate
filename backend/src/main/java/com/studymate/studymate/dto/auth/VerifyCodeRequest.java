package com.studymate.studymate.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record VerifyCodeRequest(
        @NotBlank @Pattern(regexp = "\\d{9}", message = "must be a 9-digit student ID") String studentId,
        @NotBlank @Pattern(regexp = "\\d{6}", message = "must be the 6-digit code from your email") String code
) {
}
