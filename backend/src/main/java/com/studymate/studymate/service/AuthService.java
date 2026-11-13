package com.studymate.studymate.service;

import com.studymate.studymate.dto.auth.SendCodeRequest;
import com.studymate.studymate.dto.auth.VerifyCodeRequest;
import com.studymate.studymate.dto.user.UserSummary;
import com.studymate.studymate.entity.LoginCode;
import com.studymate.studymate.entity.User;
import com.studymate.studymate.repository.LoginCodeRepository;
import com.studymate.studymate.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;

@Service
public class AuthService {

    private static final int MINUTES_VALID = 10;
    private static final Duration RESEND_WAIT = Duration.ofSeconds(60);
    private static final int MAX_WRONG_ATTEMPTS = 5;

    private final UserRepository userRepository;
    private final LoginCodeRepository codeRepository;
    private final PasswordEncoder passwordEncoder;
    private final LoginCodeMailer mailer;
    private final SecureRandom random = new SecureRandom();

    public AuthService(
            UserRepository userRepository,
            LoginCodeRepository codeRepository,
            PasswordEncoder passwordEncoder,
            LoginCodeMailer mailer) {

        this.userRepository = userRepository;
        this.codeRepository = codeRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailer = mailer;
    }

    // Step 1: email a fresh 6-digit code to studentId@sdu.edu.kz
    @Transactional
    public void sendCode(SendCodeRequest request) {
        String email = emailOf(request.studentId());
        Instant now = Instant.now();

        codeRepository.findByEmail(email).ifPresent(old -> {
            if (old.getSentAt().plus(RESEND_WAIT).isAfter(now)) {
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,
                        "We just sent you a code. Wait a minute before asking for a new one.");
            }
            codeRepository.delete(old);
            codeRepository.flush();
        });

        String code = String.format("%06d", random.nextInt(1_000_000));
        codeRepository.save(new LoginCode(email, passwordEncoder.encode(code), now, now.plus(Duration.ofMinutes(MINUTES_VALID))));

        mailer.send(email, code, MINUTES_VALID);
    }

    // Step 2: check the code. The first successful login creates the account.
    // noRollbackFor keeps the wrong-attempt count saved even though we answer with an error.
    @Transactional(noRollbackFor = ResponseStatusException.class)
    public UserSummary verifyCode(VerifyCodeRequest request) {
        String email = emailOf(request.studentId());

        LoginCode loginCode = codeRepository.findByEmail(email)
                .orElseThrow(() -> wrongCode("Ask for a code first."));

        if (loginCode.getExpiresAt().isBefore(Instant.now())) {
            codeRepository.delete(loginCode);
            throw wrongCode("This code has expired. Ask for a new one.");
        }

        if (!passwordEncoder.matches(request.code(), loginCode.getCodeHash())) {
            loginCode.addWrongAttempt();

            if (loginCode.getWrongAttempts() >= MAX_WRONG_ATTEMPTS) {
                codeRepository.delete(loginCode);
                throw wrongCode("Too many wrong tries. Ask for a new code.");
            }
            throw wrongCode("Wrong code. Check your email and try again.");
        }

        codeRepository.delete(loginCode);

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(new User(request.studentId(), email)));

        return new UserSummary(user.getId(), user.getName());
    }

    private String emailOf(String studentId) {
        return studentId + "@sdu.edu.kz";
    }

    private ResponseStatusException wrongCode(String message) {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, message);
    }
}
