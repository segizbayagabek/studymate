package com.studymate.studymate.repository;

import com.studymate.studymate.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByCourseId(Long courseId);

    Optional<Task> findByIdAndCourseId(Long id, Long courseId);
}
