package com.studymate.studymate.service;

import com.studymate.studymate.dto.group.StudyGroupCreateRequest;
import com.studymate.studymate.dto.group.StudyGroupResponse;
import com.studymate.studymate.entity.GroupStatus;
import com.studymate.studymate.entity.JoinRequest;
import com.studymate.studymate.entity.JoinRequestStatus;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyGroup;
import com.studymate.studymate.entity.StudyPlace;
import com.studymate.studymate.entity.User;
import com.studymate.studymate.exception.BusinessRuleException;
import com.studymate.studymate.exception.ResourceNotFoundException;
import com.studymate.studymate.mapper.StudyGroupMapper;
import com.studymate.studymate.repository.JoinRequestRepository;
import com.studymate.studymate.repository.StudyGroupRepository;
import com.studymate.studymate.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@Transactional(readOnly = true)
public class StudyGroupServiceImpl implements StudyGroupService {

    private final StudyGroupRepository groupRepository;
    private final JoinRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final StudyGroupMapper groupMapper;

    public StudyGroupServiceImpl(
            StudyGroupRepository groupRepository,
            JoinRequestRepository requestRepository,
            UserRepository userRepository,
            StudyGroupMapper groupMapper) {

        this.groupRepository = groupRepository;
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.groupMapper = groupMapper;
    }

    @Override
    @Transactional
    public StudyGroupResponse createGroup(Long userId, StudyGroupCreateRequest request) {
        User organizer = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        StudyGroup group = new StudyGroup(
                organizer,
                request.title().trim(),
                request.description(),
                request.subjectName().trim(),
                request.courseCode().trim().toUpperCase(Locale.ROOT),
                request.place(),
                request.exactSpot(),
                request.meetingDate(),
                request.startTime(),
                request.endTime(),
                request.level(),
                request.preferences(),
                request.groupSize()
        );

        return groupMapper.toResponse(groupRepository.save(group), true);
    }

    @Override
    public List<StudyGroupResponse> searchOpenGroups(
            String courseCode,
            StudyPlace place,
            KnowledgeLevel level,
            LocalDate dateFrom,
            LocalDate dateTo) {

        LocalDate from = dateFrom != null ? dateFrom : LocalDate.now();

        Specification<StudyGroup> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("status"), GroupStatus.OPEN));
            predicates.add(cb.greaterThanOrEqualTo(root.get("meetingDate"), from));

            if (dateTo != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("meetingDate"), dateTo));
            }
            if (courseCode != null && !courseCode.isBlank()) {
                predicates.add(cb.equal(root.get("courseCode"), courseCode.trim().toUpperCase(Locale.ROOT)));
            }
            if (place != null) {
                predicates.add(cb.equal(root.get("place"), place));
            }
            if (level != null) {
                predicates.add(cb.equal(root.get("level"), level));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return groupRepository.findAll(spec, Sort.by("meetingDate", "startTime")).stream()
                .map(group -> groupMapper.toResponse(group, false))
                .toList();
    }

    @Override
    public StudyGroupResponse getGroup(Long userId, Long groupId) {
        StudyGroup group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Study group", groupId));

        boolean canSeeSpot = group.isOrganizer(userId)
                || requestRepository.existsByGroupIdAndApplicantIdAndStatus(groupId, userId, JoinRequestStatus.ACCEPTED);

        return groupMapper.toResponse(group, canSeeSpot);
    }

    @Override
    public List<StudyGroupResponse> getOrganizedGroups(Long userId) {
        return groupRepository.findByOrganizerIdOrderByMeetingDateAscStartTimeAsc(userId).stream()
                .map(group -> groupMapper.toResponse(group, true))
                .toList();
    }

    @Override
    @Transactional
    public StudyGroupResponse cancelGroup(Long userId, Long groupId) {
        StudyGroup group = groupRepository.findByIdAndOrganizerId(groupId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Study group", groupId));

        if (group.getStatus() == GroupStatus.CANCELLED) {
            throw new BusinessRuleException("Study group is already cancelled");
        }
        group.cancel();

        // Applicants waiting for a decision get a final answer
        requestRepository.findByGroupIdOrderByScoreDescCreatedAtAsc(groupId).stream()
                .filter(request -> request.getStatus() == JoinRequestStatus.PENDING)
                .forEach(JoinRequest::reject);

        return groupMapper.toResponse(group, true);
    }
}
