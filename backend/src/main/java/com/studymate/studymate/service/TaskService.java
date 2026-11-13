package com.studymate.studymate.service;

import com.studymate.studymate.dto.task.TaskCreateRequest;
import com.studymate.studymate.dto.task.TaskResponse;
import com.studymate.studymate.dto.task.TaskUpdateRequest;

import java.util.List;

public interface TaskService {

    List<TaskResponse> getTasks(Long userId, Long courseId);

    TaskResponse getTask(Long userId, Long courseId, Long taskId);

    TaskResponse createTask(Long userId, Long courseId, TaskCreateRequest request);

    TaskResponse updateTask(Long userId, Long courseId, Long taskId, TaskUpdateRequest request);

    void deleteTask(Long userId, Long courseId, Long taskId);
}
