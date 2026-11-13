package com.studymate.studymate.controller;

import com.studymate.studymate.dto.profile.ProfileResponse;
import com.studymate.studymate.dto.profile.ProfileUpdateRequest;
import com.studymate.studymate.dto.profile.UsernameUpdateRequest;
import com.studymate.studymate.dto.user.UserSummary;
import com.studymate.studymate.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/{userId}")
@CrossOrigin(originPatterns = {"http://localhost:5173", "https://*.trycloudflare.com"})
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // Everything the profile page shows: username, subjects, study style, stats and recent sessions
    @GetMapping("/profile")
    public ProfileResponse getProfile(@PathVariable Long userId) {
        return profileService.getProfile(userId);
    }

    // Subjects, study style and favourite places
    @PutMapping("/profile")
    public ProfileResponse updateProfile(
            @PathVariable Long userId,
            @Valid @RequestBody ProfileUpdateRequest request) {

        return profileService.updateProfile(userId, request);
    }

    // Change the username (it starts as the student ID)
    @PutMapping("/name")
    public UserSummary changeUsername(
            @PathVariable Long userId,
            @Valid @RequestBody UsernameUpdateRequest request) {

        return profileService.changeUsername(userId, request.name());
    }
}
