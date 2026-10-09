package com.studymate.studymate.dto.group;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyPlace;
import com.studymate.studymate.entity.StudyPreference;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

public record StudyGroupCreateRequest(
        @NotBlank @Size(max = 255) String title,
        @Size(max = 2000) String description,
        @NotBlank @Size(max = 255) String subjectName,
        @NotBlank @Size(max = 32) String courseCode,
        @NotNull StudyPlace place,
        @Size(max = 255) String exactSpot,
        @NotNull @FutureOrPresent LocalDate meetingDate,
        @NotNull LocalTime startTime,
        @NotNull LocalTime endTime,
        @NotNull KnowledgeLevel level,
        Set<StudyPreference> preferences,
        @Min(2) @Max(10) int groupSize
) {

    @JsonIgnore
    @AssertTrue(message = "endTime must be after startTime")
    public boolean isTimeRangeValid() {
        return startTime == null || endTime == null || endTime.isAfter(startTime);
    }
}
