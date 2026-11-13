package com.studymate.studymate.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyPreference;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalTime;
import java.util.Set;

public record JoinRequestCreateRequest(
        @NotBlank @Size(max = 32) String courseCode,
        @NotNull KnowledgeLevel level,
        @NotNull LocalTime availableFrom,
        @NotNull LocalTime availableTo,
        Set<StudyPreference> preferences,
        @Size(max = 500) String note
) {

    @JsonIgnore
    @AssertTrue(message = "availableTo must be after availableFrom")
    public boolean isTimeRangeValid() {
        return availableFrom == null || availableTo == null || availableTo.isAfter(availableFrom);
    }
}
