package com.studymate.studymate.dto.profile;

import com.studymate.studymate.entity.StudyPlace;
import com.studymate.studymate.entity.StudyPreference;

import java.util.List;
import java.util.Set;

public record ProfileResponse(
        Long id,
        String name,
        String studentId,
        String email,
        List<ProfileSubjectDto> subjects,
        StudyPreference studyStyle,
        Set<StudyPlace> favouritePlaces,
        int sessionsJoined,
        int groupsOrganized,
        int studentsMet,
        int sessionsThisMonth,
        List<SessionSummary> recentSessions
) {
}
