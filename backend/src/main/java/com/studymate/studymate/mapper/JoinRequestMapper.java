package com.studymate.studymate.mapper;

import com.studymate.studymate.dto.request.JoinRequestResponse;
import com.studymate.studymate.dto.request.ScoreBreakdown;
import com.studymate.studymate.dto.user.UserSummary;
import com.studymate.studymate.entity.JoinRequest;
import com.studymate.studymate.entity.StudyGroup;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class JoinRequestMapper {

    public JoinRequestResponse toResponse(JoinRequest request) {
        StudyGroup group = request.getGroup();

        return new JoinRequestResponse(
                request.getId(),
                group.getId(),
                group.getTitle(),
                group.getCourseCode(),
                group.getStatus(),
                new UserSummary(request.getApplicant().getId(), request.getApplicant().getName()),
                request.getCourseCode(),
                request.getLevel(),
                request.getAvailableFrom(),
                request.getAvailableTo(),
                Set.copyOf(request.getPreferences()),
                request.getNote(),
                request.getScore(),
                new ScoreBreakdown(
                        request.getSubjectScore(),
                        request.getTimeScore(),
                        request.getLevelScore(),
                        request.getPreferenceScore()
                ),
                request.getStatus(),
                request.getCreatedAt(),
                request.getDecidedAt()
        );
    }
}
