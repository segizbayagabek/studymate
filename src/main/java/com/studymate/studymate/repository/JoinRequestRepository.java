package com.studymate.studymate.repository;

import com.studymate.studymate.entity.JoinRequest;
import com.studymate.studymate.entity.JoinRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {

    List<JoinRequest> findByGroupIdOrderByScoreDescCreatedAtAsc(Long groupId);

    List<JoinRequest> findByApplicantIdOrderByCreatedAtDesc(Long applicantId);

    boolean existsByGroupIdAndApplicantIdAndStatus(Long groupId, Long applicantId, JoinRequestStatus status);

    boolean existsByGroupIdAndApplicantIdAndStatusNot(Long groupId, Long applicantId, JoinRequestStatus status);

    Optional<JoinRequest> findByIdAndGroupOrganizerId(Long id, Long organizerId);

    Optional<JoinRequest> findByIdAndApplicantId(Long id, Long applicantId);
}
