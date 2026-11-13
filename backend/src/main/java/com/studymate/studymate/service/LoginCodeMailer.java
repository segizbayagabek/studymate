package com.studymate.studymate.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LoginCodeMailer {

    private static final Logger log = LoggerFactory.getLogger(LoginCodeMailer.class);

    private final JavaMailSender mailSender;
    private final String from;

    public LoginCodeMailer(JavaMailSender mailSender, @Value("${spring.mail.username:}") String from) {
        this.mailSender = mailSender;
        this.from = from;
    }

    // Always sends a real email. If it fails, the error goes back to the student
    // and AuthService rolls back, so no unused code stays in the database.
    public void send(String email, String code, int minutesValid) {
        if (from.isBlank()) {
            log.error("Can't send the login code: set GMAIL_USER and GMAIL_APP_PASSWORD in the .env file.");
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Email sending is not set up on the server yet.");
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(email);
        message.setSubject("Your Study Mate login code: " + code);
        message.setText("Your Study Mate login code is " + code + ".\n\n"
                + "It works for " + minutesValid + " minutes. If you didn't try to log in, you can ignore this email.");

        try {
            mailSender.send(message);
        } catch (MailException e) {
            log.error("Could not send the login code to {}", email, e);
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "We couldn't send the email. Please try again in a moment.");
        }
    }
}
