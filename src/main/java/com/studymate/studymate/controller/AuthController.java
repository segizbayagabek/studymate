package com.studymate.studymate.controller;

import com.studymate.studymate.entity.User;
import com.studymate.studymate.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public record LoginRequest(String studentId, String email, String password) {}

    public record LoginResponse(Long id, String name, String email) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String identifier = request.email() != null && !request.email().isBlank()
                ? request.email().trim()
                : (request.studentId() != null ? request.studentId().trim() : "");

        String password = request.password();

        if (identifier.isEmpty() || password == null || password.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Wrong student ID or password."));
        }

        String lookupEmail = identifier.contains("@") ? identifier : identifier + "@sdu.edu.kz";

        Optional<User> found = userRepository.findByEmail(lookupEmail);
        if (found.isEmpty() || !password.equals(found.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Wrong student ID or password."));
        }

        User user = found.get();
        return ResponseEntity.ok(new LoginResponse(user.getId(), user.getName(), user.getEmail()));
    }
}
