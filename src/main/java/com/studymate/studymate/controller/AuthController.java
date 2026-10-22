package com.studymate.studymate.controller;

import com.studymate.studymate.dto.auth.LoginRequest;
import com.studymate.studymate.dto.user.UserSummary;
import com.studymate.studymate.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserSummary login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request.studentId(), request.password());
    }
}
