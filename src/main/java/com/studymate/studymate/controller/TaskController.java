package com.studymate.studymate.controller;

import com.studymate.studymate.dto.task.TaskCreateRequest;
import com.studymate.studymate.dto.task.TaskResponse;
import com.studymate.studymate.dto.task.TaskUpdateRequest;
import com.studymate.studymate.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/courses/{courseId}/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskResponse> getTasks(
            @PathVariable Long userId,
            @PathVariable Long courseId) {

        return taskService.getTasks(userId, courseId);
    }

    @GetMapping("/{taskId}")
    public TaskResponse getTask(
            @PathVariable Long userId,
            @PathVariable Long courseId,
            @PathVariable Long taskId) {

        return taskService.getTask(userId, courseId, taskId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse createTask(
            @PathVariable Long userId,
            @PathVariable Long courseId,
            @Valid @RequestBody TaskCreateRequest request) {

        return taskService.createTask(userId, courseId, request);
    }

    @PutMapping("/{taskId}")
    public TaskResponse updateTask(
            @PathVariable Long userId,
            @PathVariable Long courseId,
            @PathVariable Long taskId,
            @Valid @RequestBody TaskUpdateRequest request) {

        return taskService.updateTask(userId, courseId, taskId, request);
    }

    @DeleteMapping("/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(
            @PathVariable Long userId,
            @PathVariable Long courseId,
            @PathVariable Long taskId) {

        taskService.deleteTask(userId, courseId, taskId);
    }
}
