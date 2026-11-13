package com.studymate.studymate.service;

import com.studymate.studymate.dto.profile.ProfileResponse;
import com.studymate.studymate.dto.profile.ProfileSubjectDto;
import com.studymate.studymate.dto.profile.ProfileUpdateRequest;
import com.studymate.studymate.dto.profile.SessionSummary;
import com.studymate.studymate.dto.user.UserSummary;
import com.studymate.studymate.entity.GroupStatus;
import com.studymate.studymate.entity.JoinRequest;
import com.studymate.studymate.entity.JoinRequestStatus;
import com.studymate.studymate.entity.ProfileSubject;
import com.studymate.studymate.entity.StudyGroup;
import com.studymate.studymate.entity.StudyPreference;
import com.studymate.studymate.entity.User;
import com.studymate.studymate.exception.ResourceNotFoundException;
import com.studymate.studymate.repository.JoinRequestRepository;
import com.studymate.studymate.repository.StudyGroupRepository;
import com.studymate.studymate.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class ProfileService {

    private static final int RECENT_SESSIONS = 5;
    private static final Set<StudyPreference> STUDY_STYLES =
            Set.of(StudyPreference.QUIET_WORK, StudyPreference.MIXED_GROUP, StudyPreference.TALKATIVE);

    private final UserRepository userRepository;
    private final StudyGroupRepository groupRepository;
    private final JoinRequestRepository requestRepository;

    public ProfileService(
            UserRepository userRepository,
            StudyGroupRepository groupRepository,
            JoinRequestRepository requestRepository) {

        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.requestRepository = requestRepository;
    }

    public ProfileResponse getProfile(Long userId) {
        User user = findUser(userId);

        // Sessions = groups the user organizes + groups they were accepted into (cancelled ones don't count)
        List<StudyGroup> organized = groupRepository.findByOrganizerIdOrderByMeetingDateAscStartTimeAsc(userId)
                .stream()
                .filter(group -> group.getStatus() != GroupStatus.CANCELLED)
                .toList();

        List<StudyGroup> joined = requestRepository.findByApplicantIdOrderByCreatedAtDesc(userId)
                .stream()
                .filter(request -> request.getStatus() == JoinRequestStatus.ACCEPTED)
                .map(JoinRequest::getGroup)
                .filter(group -> group.getStatus() != GroupStatus.CANCELLED)
                .toList();

        List<StudyGroup> all = new ArrayList<>(organized);
        all.addAll(joined);

        return new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getStudentId(),
                user.getEmail(),
                user.getSubjects().stream().map(this::toDto).toList(),
                user.getStudyStyle(),
                Set.copyOf(user.getFavouritePlaces()),
                joined.size(),
                organized.size(),
                countStudentsMet(userId, joined, all),
                countThisMonth(all),
                recentSessions(userId, all)
        );
    }

    // The username starts as the student ID and can be changed here
    @Transactional
    public UserSummary changeUsername(Long userId, String newName) {
        User user = findUser(userId);
        String name = newName.trim().replaceAll("\\s+", " ");

        if (name.length() < 3 || name.length() > 30) {
            throw badRequest("Username must be 3 to 30 characters long.");
        }
        if (!name.matches("[\\p{L}\\p{N} ._-]+")) {
            throw badRequest("Username can only use letters, numbers, spaces, dots, dashes and underscores.");
        }
        // All-digit names look like student IDs, so only your own ID is allowed.
        // Otherwise someone could take the name a new student gets on their first login.
        if (!name.matches(".*\\p{L}.*") && !name.equals(user.getStudentId())) {
            throw badRequest("Username needs at least one letter.");
        }
        if (userRepository.existsByNameIgnoreCaseAndIdNot(name, userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This username is already taken.");
        }

        user.setName(name);
        return new UserSummary(user.getId(), user.getName());
    }

    @Transactional
    public ProfileResponse updateProfile(Long userId, ProfileUpdateRequest request) {
        User user = findUser(userId);

        if (request.studyStyle() != null && !STUDY_STYLES.contains(request.studyStyle())) {
            throw badRequest("Study style must be QUIET_WORK, MIXED_GROUP or TALKATIVE.");
        }

        // Same course twice would be confusing, so keep only the first one
        Set<String> seenCodes = new HashSet<>();
        List<ProfileSubject> subjects = new ArrayList<>();
        for (ProfileSubjectDto subject : request.subjects()) {
            String code = subject.courseCode().trim().toUpperCase(Locale.ROOT);
            if (seenCodes.add(code)) {
                subjects.add(new ProfileSubject(subject.subjectName().trim(), code, subject.level()));
            }
        }

        user.getSubjects().clear();
        user.getSubjects().addAll(subjects);
        user.setStudyStyle(request.studyStyle());
        user.getFavouritePlaces().clear();
        if (request.favouritePlaces() != null) {
            user.getFavouritePlaces().addAll(request.favouritePlaces());
        }

        return getProfile(userId);
    }

    // Everyone the user studied with: the owners of groups they joined,
    // plus the accepted members of all their groups
    private int countStudentsMet(Long userId, List<StudyGroup> joined, List<StudyGroup> all) {
        Set<Long> people = new HashSet<>();
        joined.forEach(group -> people.add(group.getOrganizer().getId()));

        List<Long> groupIds = all.stream().map(StudyGroup::getId).toList();
        if (!groupIds.isEmpty()) {
            requestRepository.findByGroupIdInAndStatus(groupIds, JoinRequestStatus.ACCEPTED)
                    .forEach(request -> people.add(request.getApplicant().getId()));
        }

        people.remove(userId);
        return people.size();
    }

    private int countThisMonth(List<StudyGroup> groups) {
        LocalDate today = LocalDate.now();
        return (int) groups.stream()
                .filter(group -> group.getMeetingDate().getYear() == today.getYear()
                        && group.getMeetingDate().getMonth() == today.getMonth())
                .count();
    }

    private List<SessionSummary> recentSessions(Long userId, List<StudyGroup> groups) {
        return groups.stream()
                .sorted(Comparator.comparing(StudyGroup::getMeetingDate)
                        .thenComparing(StudyGroup::getStartTime)
                        .reversed())
                .limit(RECENT_SESSIONS)
                .map(group -> new SessionSummary(
                        group.getId(),
                        group.getTitle(),
                        group.getSubjectName(),
                        group.getCourseCode(),
                        group.getPlace(),
                        group.getMeetingDate(),
                        group.isOrganizer(userId)))
                .toList();
    }

    private ProfileSubjectDto toDto(ProfileSubject subject) {
        return new ProfileSubjectDto(subject.getSubjectName(), subject.getCourseCode(), subject.getLevel());
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
    }

    private ResponseStatusException badRequest(String message) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
    }
}
