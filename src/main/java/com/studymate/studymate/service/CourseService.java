package com.studymate.studymate.service;

import com.studymate.studymate.entity.Course;
import com.studymate.studymate.entity.User;
import com.studymate.studymate.repository.CourseRepository;
import com.studymate.studymate.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseService(
            CourseRepository courseRepository,
            UserRepository userRepository) {

        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesByUser(Long userId) {
        return courseRepository.findByUserId(userId);
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public Course createCourse(Long userId, Course course) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        course.setUser(user);

        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {

        Course course = getCourseById(id);

        course.setName(updatedCourse.getName());
        course.setDescription(updatedCourse.getDescription());

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {

        Course course = getCourseById(id);

        courseRepository.delete(course);
    }
}
