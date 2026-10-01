package com.studymate.studymate.service;

import com.studymate.studymate.dto.task.TaskCreateRequest;
import com.studymate.studymate.dto.task.TaskResponse;
import com.studymate.studymate.dto.task.TaskUpdateRequest;
import com.studymate.studymate.entity.Course;
import com.studymate.studymate.entity.Task;
import com.studymate.studymate.exception.ResourceNotFoundException;
import com.studymate.studymate.mapper.TaskMapper;
import com.studymate.studymate.repository.CourseRepository;
import com.studymate.studymate.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final CourseRepository courseRepository;
    private final TaskMapper taskMapper;

    public TaskServiceImpl(
            TaskRepository taskRepository,
            CourseRepository courseRepository,
            TaskMapper taskMapper) {

        this.taskRepository = taskRepository;
        this.courseRepository = courseRepository;
        this.taskMapper = taskMapper;
    }

    @Override
    public List<TaskResponse> getTasks(Long userId, Long courseId) {
        Course course = findUserCourse(userId, courseId);

        return taskRepository.findByCourseId(course.getId()).stream()
                .map(taskMapper::toResponse)
                .toList();
    }

    @Override
    public TaskResponse getTask(Long userId, Long courseId, Long taskId) {
        return taskMapper.toResponse(findCourseTask(userId, courseId, taskId));
    }

    @Override
    @Transactional
    public TaskResponse createTask(Long userId, Long courseId, TaskCreateRequest request) {
        Course course = findUserCourse(userId, courseId);

        Task task = new Task(request.title(), request.description(), course);

        return taskMapper.toResponse(taskRepository.save(task));
    }

    @Override
    @Transactional
    public TaskResponse updateTask(Long userId, Long courseId, Long taskId, TaskUpdateRequest request) {
        Task task = findCourseTask(userId, courseId, taskId);

        task.update(request.title(), request.description(), request.status());

        return taskMapper.toResponse(task);
    }

    @Override
    @Transactional
    public void deleteTask(Long userId, Long courseId, Long taskId) {
        taskRepository.delete(findCourseTask(userId, courseId, taskId));
    }

    private Course findUserCourse(Long userId, Long courseId) {
        return courseRepository.findById(courseId)
                .filter(course -> course.getUser() != null && userId.equals(course.getUser().getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Course", courseId));
    }

    private Task findCourseTask(Long userId, Long courseId, Long taskId) {
        Course course = findUserCourse(userId, courseId);

        return taskRepository.findByIdAndCourseId(taskId, course.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Task", taskId));
    }
}
