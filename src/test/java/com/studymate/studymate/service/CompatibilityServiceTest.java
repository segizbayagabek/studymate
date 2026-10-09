package com.studymate.studymate.service;

import com.studymate.studymate.entity.CompatibilityScore;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyGroup;
import com.studymate.studymate.entity.StudyPlace;
import com.studymate.studymate.entity.StudyPreference;
import com.studymate.studymate.entity.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CompatibilityServiceTest {

    private final CompatibilityService service = new CompatibilityService();

    private StudyGroup group(KnowledgeLevel level, Set<StudyPreference> preferences) {
        return new StudyGroup(
                new User(1L, "Dana", "dana@sdu.edu.kz", "secret"),
                "Calculus II practice",
                null,
                "Calculus II",
                "MATH 161",
                StudyPlace.LIBRARY,
                "2nd floor, table 14",
                LocalDate.now().plusDays(1),
                LocalTime.of(14, 0),
                LocalTime.of(16, 0),
                level,
                preferences,
                4
        );
    }

    @Test
    void perfectMatchGivesFullScore() {
        StudyGroup group = group(KnowledgeLevel.INTERMEDIATE, Set.of(StudyPreference.QUIET_WORK));

        CompatibilityScore score = service.calculate(group, "MATH161", KnowledgeLevel.INTERMEDIATE,
                LocalTime.of(13, 0), LocalTime.of(17, 0), Set.of(StudyPreference.QUIET_WORK));

        assertEquals(new CompatibilityScore(100, 100, 100, 100), score);
        assertEquals(100, score.total());
    }

    @Test
    void subjectAndTimeOnlyGivesSeventyPercent() {
        // The example from the project documentation
        StudyGroup group = group(KnowledgeLevel.BEGINNER, Set.of(StudyPreference.QUIET_WORK));

        CompatibilityScore score = service.calculate(group, "MATH 161", KnowledgeLevel.ADVANCED,
                LocalTime.of(14, 0), LocalTime.of(16, 0), Set.of(StudyPreference.TALKATIVE));

        assertEquals(70, score.total());
    }

    @Test
    void sameDepartmentGivesHalfSubjectScore() {
        assertEquals(50, service.subjectScore("MATH 161", "MATH 162"));
        assertEquals(0, service.subjectScore("MATH 161", "CS 204"));
    }

    @Test
    void timeScoreIsShareOfMeetingCovered() {
        LocalTime start = LocalTime.of(14, 0);
        LocalTime end = LocalTime.of(16, 0);

        assertEquals(50, service.timeScore(start, end, LocalTime.of(15, 0), LocalTime.of(18, 0)));
        assertEquals(0, service.timeScore(start, end, LocalTime.of(17, 0), LocalTime.of(18, 0)));
    }

    @Test
    void levelScoreDropsPerStepUnlessAnyLevel() {
        StudyGroup strict = group(KnowledgeLevel.BEGINNER, Set.of());
        StudyGroup open = group(KnowledgeLevel.BEGINNER, Set.of(StudyPreference.ANY_LEVEL));

        assertEquals(50, service.levelScore(strict, KnowledgeLevel.INTERMEDIATE));
        assertEquals(0, service.levelScore(strict, KnowledgeLevel.ADVANCED));
        assertEquals(100, service.levelScore(open, KnowledgeLevel.ADVANCED));
    }

    @Test
    void preferenceScoreIgnoresAnyLevelAndEmptySets() {
        assertEquals(100, service.preferenceScore(Set.of(), Set.of()));
        assertEquals(100, service.preferenceScore(Set.of(StudyPreference.ANY_LEVEL), Set.of()));
        assertEquals(50, service.preferenceScore(
                Set.of(StudyPreference.QUIET_WORK, StudyPreference.SAME_YEAR),
                Set.of(StudyPreference.QUIET_WORK)));
    }
}
