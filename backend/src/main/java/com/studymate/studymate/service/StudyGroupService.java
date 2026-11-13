package com.studymate.studymate.service;

import com.studymate.studymate.dto.group.StudyGroupCreateRequest;
import com.studymate.studymate.dto.group.StudyGroupResponse;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyPlace;

import java.time.LocalDate;
import java.util.List;

public interface StudyGroupService {

    StudyGroupResponse createGroup(Long userId, StudyGroupCreateRequest request);

    List<StudyGroupResponse> searchOpenGroups(
            String courseCode,
            StudyPlace place,
            KnowledgeLevel level,
            LocalDate dateFrom,
            LocalDate dateTo);

    StudyGroupResponse getGroup(Long userId, Long groupId);

    List<StudyGroupResponse> getOrganizedGroups(Long userId);

    StudyGroupResponse cancelGroup(Long userId, Long groupId);
}
