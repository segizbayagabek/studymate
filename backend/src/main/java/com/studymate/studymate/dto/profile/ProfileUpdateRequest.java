package com.studymate.studymate.dto.profile;

import com.studymate.studymate.entity.StudyPlace;
import com.studymate.studymate.entity.StudyPreference;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Set;

// The parts of the profile a student can edit (the username has its own request)
public record ProfileUpdateRequest(
        @NotNull @Size(max = 12) List<@Valid ProfileSubjectDto> subjects,
        StudyPreference studyStyle,
        Set<StudyPlace> favouritePlaces
) {
}
