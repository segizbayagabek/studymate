package com.studymate.studymate.service;

import com.studymate.studymate.dto.request.JoinRequestCreateRequest;
import com.studymate.studymate.dto.request.JoinRequestResponse;
import com.studymate.studymate.entity.CompatibilityScore;
import com.studymate.studymate.entity.GroupStatus;
import com.studymate.studymate.entity.JoinRequest;
import com.studymate.studymate.entity.JoinRequestStatus;
import com.studymate.studymate.entity.StudyGroup;
import com.studymate.studymate.entity.StudyPreference;
import com.studymate.studymate.entity.User;
import com.studymate.studymate.exception.BusinessRuleException;
import com.studymate.studymate.exception.ResourceNotFoundException;
import com.studymate.studymate.mapper.JoinRequestMapper;
import com.studymate.studymate.repository.JoinRequestRepository;
import com.studymate.studymate.repository.StudyGroupRepository;
import com.studymate.studymate.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class JoinRequestServiceImpl implements JoinRequestService {

    private final JoinRequestRepository requestRepository;
    private final StudyGroupRepository groupRepository;
    private final UserRepository userRepository;
    private final CompatibilityService compatibilityService;
    private final JoinRequestMapper requestMapper;

    public JoinRequestServiceImpl(
            JoinRequestRepository requestRepository,
            StudyGroupRepository groupRepository,
            UserRepository userRepository,
            CompatibilityService compatibilityService,
            JoinRequestMapper requestMapper) {

        this.requestRepository = requestRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.compatibilityService = compatibilityService;
        this.requestMapper = requestMapper;
    }

    @Override
    @Transactional
    public JoinRequestResponse apply(Long userId, Long groupId, JoinRequestCreateRequest request) {
        User applicant = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        StudyGroup group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Study group", groupId));

        if (group.isOrganizer(userId)) {
            throw new BusinessRuleException("You cannot apply to your own study group");
        }
        ensureOpen(group);
        if (group.getMeetingDate().isBefore(LocalDate.now())) {
            throw new BusinessRuleException("This meeting has already taken place");
        }
        if (requestRepository.existsByGroupIdAndApplicantIdAndStatusNot(groupId, userId, JoinRequestStatus.CANCELLED)) {
            throw new BusinessRuleException("You have already applied to this study group");
        }

        Set<StudyPreference> preferences = request.preferences() != null ? request.preferences() : Set.of();
        String courseCode = request.courseCode().trim().toUpperCase(Locale.ROOT);

        CompatibilityScore compatibility = compatibilityService.calculate(
                group,
                courseCode,
                request.level(),
                request.availableFrom(),
                request.availableTo(),
                preferences
        );

        JoinRequest joinRequest = new JoinRequest(
                group,
                applicant,
                courseCode,
                request.level(),
                request.availableFrom(),
                request.availableTo(),
                preferences,
                request.note(),
                compatibility
        );

        return requestMapper.toResponse(requestRepository.save(joinRequest));
    }

    @Override
    public List<JoinRequestResponse> getGroupRequests(Long userId, Long groupId) {
        StudyGroup group = groupRepository.findByIdAndOrganizerId(groupId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Study group", groupId));

        return requestRepository.findByGroupIdOrderByScoreDescCreatedAtAsc(group.getId()).stream()
                .map(requestMapper::toResponse)
                .toList();
    }

    @Override
    public List<JoinRequestResponse> getMyRequests(Long userId) {
        return requestRepository.findByApplicantIdOrderByCreatedAtDesc(userId).stream()
                .map(requestMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public JoinRequestResponse accept(Long userId, Long requestId) {
        JoinRequest request = findOrganizerRequest(userId, requestId);
        ensurePending(request);
        ensureOpen(request.getGroup());

        request.accept();
        request.getGroup().addMember();

        return requestMapper.toResponse(request);
    }

    @Override
    @Transactional
    public JoinRequestResponse reject(Long userId, Long requestId) {
        JoinRequest request = findOrganizerRequest(userId, requestId);
        ensurePending(request);

        request.reject();

        return requestMapper.toResponse(request);
    }

    @Override
    @Transactional
    public JoinRequestResponse cancel(Long userId, Long requestId) {
        JoinRequest request = requestRepository.findByIdAndApplicantId(requestId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Join request", requestId));
        ensurePending(request);

        request.cancel();

        return requestMapper.toResponse(request);
    }

    private JoinRequest findOrganizerRequest(Long userId, Long requestId) {
        return requestRepository.findByIdAndGroupOrganizerId(requestId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Join request", requestId));
    }

    private void ensurePending(JoinRequest request) {
        if (request.getStatus() != JoinRequestStatus.PENDING) {
            throw new BusinessRuleException("Join request is already " + request.getStatus().name().toLowerCase(Locale.ROOT));
        }
    }

    private void ensureOpen(StudyGroup group) {
        if (group.getStatus() == GroupStatus.FULL) {
            throw new BusinessRuleException("Study group is full");
        }
        if (group.getStatus() == GroupStatus.CANCELLED) {
            throw new BusinessRuleException("Study group was cancelled");
        }
    }
}
