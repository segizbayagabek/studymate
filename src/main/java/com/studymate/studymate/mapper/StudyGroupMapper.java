package com.studymate.studymate.mapper;

import com.studymate.studymate.dto.group.StudyGroupResponse;
import com.studymate.studymate.dto.user.UserSummary;
import com.studymate.studymate.entity.StudyGroup;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class StudyGroupMapper {

    public StudyGroupResponse toResponse(StudyGroup group, boolean showExactSpot) {
        return new StudyGroupResponse(
                group.getId(),
                group.getTitle(),
                group.getDescription(),
                group.getSubjectName(),
                group.getCourseCode(),
                group.getPlace(),
                showExactSpot ? group.getExactSpot() : null,
                group.getMeetingDate(),
                group.getStartTime(),
                group.getEndTime(),
                group.getLevel(),
                Set.copyOf(group.getPreferences()),
                group.getGroupSize(),
                group.getMemberCount(),
                group.getSeatsLeft(),
                group.getStatus(),
                new UserSummary(group.getOrganizer().getId(), group.getOrganizer().getName()),
                group.getCreatedAt()
        );
    }
}
