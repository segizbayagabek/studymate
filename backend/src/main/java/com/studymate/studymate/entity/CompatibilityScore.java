package com.studymate.studymate.entity;

/**
 * Weighted compatibility: subject 40%, time 30%, level 20%, preferences 10%.
 * Every part is 0-100, so the organizer can see how the total was built.
 */
public record CompatibilityScore(int subject, int time, int level, int preferences) {

    public int total() {
        return (int) Math.round(subject * 0.4 + time * 0.3 + level * 0.2 + preferences * 0.1);
    }
}
