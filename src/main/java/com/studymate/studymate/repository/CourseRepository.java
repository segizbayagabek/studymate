package com.studymate.studymate.repository;

import com.studymate.studymate.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByUserId(Long userId);
}
