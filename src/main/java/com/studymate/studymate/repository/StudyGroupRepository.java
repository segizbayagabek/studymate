package com.studymate.studymate.repository;

import com.studymate.studymate.entity.StudyGroup;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface StudyGroupRepository extends JpaRepository<StudyGroup, Long>, JpaSpecificationExecutor<StudyGroup> {

    // Load organizer and preferences in one query for the browse list
    @Override
    @EntityGraph(attributePaths = {"organizer", "preferences"})
    List<StudyGroup> findAll(Specification<StudyGroup> spec, Sort sort);

    List<StudyGroup> findByOrganizerIdOrderByMeetingDateAscStartTimeAsc(Long organizerId);

    Optional<StudyGroup> findByIdAndOrganizerId(Long id, Long organizerId);
}
