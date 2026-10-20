package com.studymate.studymate.controller;

import com.studymate.studymate.dto.request.JoinRequestCreateRequest;
import com.studymate.studymate.dto.request.JoinRequestResponse;
import com.studymate.studymate.service.JoinRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}")
@CrossOrigin(origins = "http://localhost:5173")
public class JoinRequestController {

    private final JoinRequestService requestService;

    public JoinRequestController(JoinRequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping("/groups/{groupId}/requests")
    @ResponseStatus(HttpStatus.CREATED)
    public JoinRequestResponse apply(
            @PathVariable Long userId,
            @PathVariable Long groupId,
            @Valid @RequestBody JoinRequestCreateRequest request) {

        return requestService.apply(userId, groupId, request);
    }

    // Applicants of the organizer's group, best match first
    @GetMapping("/groups/{groupId}/requests")
    public List<JoinRequestResponse> getGroupRequests(
            @PathVariable Long userId,
            @PathVariable Long groupId) {

        return requestService.getGroupRequests(userId, groupId);
    }

    // Requests the user has sent, with their status
    @GetMapping("/requests")
    public List<JoinRequestResponse> getMyRequests(@PathVariable Long userId) {
        return requestService.getMyRequests(userId);
    }

    @PatchMapping("/requests/{requestId}/accept")
    public JoinRequestResponse accept(
            @PathVariable Long userId,
            @PathVariable Long requestId) {

        return requestService.accept(userId, requestId);
    }

    @PatchMapping("/requests/{requestId}/reject")
    public JoinRequestResponse reject(
            @PathVariable Long userId,
            @PathVariable Long requestId) {

        return requestService.reject(userId, requestId);
    }

    @PatchMapping("/requests/{requestId}/cancel")
    public JoinRequestResponse cancel(
            @PathVariable Long userId,
            @PathVariable Long requestId) {

        return requestService.cancel(userId, requestId);
    }
}
