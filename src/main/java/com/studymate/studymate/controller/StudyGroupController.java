package com.studymate.studymate.controller;

import com.studymate.studymate.dto.group.StudyGroupCreateRequest;
import com.studymate.studymate.dto.group.StudyGroupResponse;
import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyPlace;
import com.studymate.studymate.service.StudyGroupService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class StudyGroupController {

    private final StudyGroupService groupService;

    public StudyGroupController(StudyGroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/groups")
    public List<StudyGroupResponse> searchGroups(
            @RequestParam(required = false) String courseCode,
            @RequestParam(required = false) StudyPlace place,
            @RequestParam(required = false) KnowledgeLevel level,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {

        return groupService.searchOpenGroups(courseCode, place, level, dateFrom, dateTo);
    }

    @PostMapping("/users/{userId}/groups")
    @ResponseStatus(HttpStatus.CREATED)
    public StudyGroupResponse createGroup(
            @PathVariable Long userId,
            @Valid @RequestBody StudyGroupCreateRequest request) {

        return groupService.createGroup(userId, request);
    }

    @GetMapping("/users/{userId}/groups")
    public List<StudyGroupResponse> getOrganizedGroups(@PathVariable Long userId) {
        return groupService.getOrganizedGroups(userId);
    }

    @GetMapping("/users/{userId}/groups/{groupId}")
    public StudyGroupResponse getGroup(
            @PathVariable Long userId,
            @PathVariable Long groupId) {

        return groupService.getGroup(userId, groupId);
    }

    @PatchMapping("/users/{userId}/groups/{groupId}/cancel")
    public StudyGroupResponse cancelGroup(
            @PathVariable Long userId,
            @PathVariable Long groupId) {

        return groupService.cancelGroup(userId, groupId);
    }
}
