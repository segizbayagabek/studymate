package com.studymate.studymate.service;

import com.studymate.studymate.entity.CompatibilityScore;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyGroup;
import com.studymate.studymate.entity.StudyPreference;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.EnumSet;
import java.util.Locale;
import java.util.Set;

@Service
public class CompatibilityService {

    public CompatibilityScore calculate(
            StudyGroup group,
            String courseCode,
            KnowledgeLevel level,
            LocalTime availableFrom,
            LocalTime availableTo,
            Set<StudyPreference> preferences) {

        return new CompatibilityScore(
                subjectScore(group.getCourseCode(), courseCode),
                timeScore(group.getStartTime(), group.getEndTime(), availableFrom, availableTo),
                levelScore(group, level),
                preferenceScore(group.getPreferences(), preferences)
        );
    }

    // Same course code: 100. Same department prefix (MATH 161 vs MATH 162): 50.
    int subjectScore(String groupCode, String applicantCode) {
        String a = normalize(groupCode);
        String b = normalize(applicantCode);

        if (a.equals(b)) {
            return 100;
        }
        String prefixA = a.replaceAll("[^A-Z]", "");
        String prefixB = b.replaceAll("[^A-Z]", "");
        return !prefixA.isEmpty() && prefixA.equals(prefixB) ? 50 : 0;
    }

    // Share of the meeting that fits into the applicant's free window.
    int timeScore(LocalTime start, LocalTime end, LocalTime from, LocalTime to) {
        long meeting = Duration.between(start, end).toMinutes();
        if (meeting <= 0) {
            return 0;
        }
        LocalTime overlapStart = start.isAfter(from) ? start : from;
        LocalTime overlapEnd = end.isBefore(to) ? end : to;
        long overlap = Math.max(0, Duration.between(overlapStart, overlapEnd).toMinutes());

        return (int) Math.round(overlap * 100.0 / meeting);
    }

    // Same level: 100, one step apart: 50, two steps: 0. "Any level" groups accept everyone.
    int levelScore(StudyGroup group, KnowledgeLevel applicantLevel) {
        if (group.getPreferences().contains(StudyPreference.ANY_LEVEL)) {
            return 100;
        }
        int gap = Math.abs(group.getLevel().ordinal() - applicantLevel.ordinal());
        return Math.max(0, 100 - gap * 50);
    }

    // Share of the group's preferences the applicant also picked. No preferences means a full match.
    int preferenceScore(Set<StudyPreference> groupPrefs, Set<StudyPreference> applicantPrefs) {
        Set<StudyPreference> wanted = groupPrefs.isEmpty()
                ? EnumSet.noneOf(StudyPreference.class)
                : EnumSet.copyOf(groupPrefs);
        // ANY_LEVEL is already used by the level part
        wanted.remove(StudyPreference.ANY_LEVEL);

        if (wanted.isEmpty()) {
            return 100;
        }
        long matched = wanted.stream()
                .filter(applicantPrefs::contains)
                .count();

        return (int) Math.round(matched * 100.0 / wanted.size());
    }

    private String normalize(String code) {
        return code == null ? "" : code.replaceAll("\\s+", "").toUpperCase(Locale.ROOT);
    }
}
