package com.studymate.studymate.mapper;

import com.studymate.studymate.dto.task.TaskResponse;
import com.studymate.studymate.entity.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCourse().getId()
        );
    }
}
