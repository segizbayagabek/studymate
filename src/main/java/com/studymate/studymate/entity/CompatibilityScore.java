package com.studymate.studymate.entity;

public record CompatibilityScore(int subject, int time, int level, int preferences) {

    public int total() {
        return (int) Math.round(subject * 0.4 + time * 0.3 + level * 0.2 + preferences * 0.1);
    }
}
