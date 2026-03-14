package com.example.ecommerce.authentication;

import com.example.ecommerce.authentication.dto.AuthRequestDto;
import com.example.ecommerce.authentication.dto.AuthResponseDto;
import com.example.ecommerce.authentication.dto.EmailVerificationRequestDto;
import com.example.ecommerce.authentication.dto.SignUpRequestDto;
import com.example.ecommerce.exception.TokenException;
import com.example.ecommerce.user.User;
import com.example.ecommerce.user.UserService;
import com.example.ecommerce.utils.EmailService;
import com.example.ecommerce.utils.JwtUtil;
import com.example.ecommerce.utils.JwtUtilEmailVerification;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtUtilEmailVerification jwtUtilEmailVerification;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody AuthRequestDto authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Credentials!"));
        }

        // Create Token for the user
        String token = jwtUtil.generateToken(authRequest.getEmail());
        return ResponseEntity.ok(new AuthResponseDto(token));
    }

    @PostMapping("/signup")
    private ResponseEntity<?> signup(@RequestBody @Valid SignUpRequestDto request) throws Exception {
        // Encode Password
        String password = PasswordEncoder.encode(request.getPassword());
        // Create user instance
        User user = userService.createUser(User.builder()
                .name(request.getUsername())
                .email(request.getEmail())
                .password(password)
                .build());
        // Generate Token for email verification
        String token = jwtUtilEmailVerification.generateToken(user.getId(), user.getEmail());
        // Create verification url
        String verificationUrl = jwtUtilEmailVerification.generateVerificationUrl(token);
        // Send Email to the user
        emailService.sendHtml(
                user.getEmail(),
                "Email Verification",
                verificationUrl
        );

        return ResponseEntity.ok(user);

    }

    @PostMapping("/email-verify")
    private ResponseEntity<?> verifyEmail(@RequestBody EmailVerificationRequestDto request) {
        String token = request.getToken();

        // Extract Claims and Verify Token Eligibility
        Claims claims = jwtUtilEmailVerification.isTokenValid(token);

        // Extract Data from claims and Verify
        boolean isVerified = userService.verifyUserEmail(Long.valueOf(claims.getSubject()),
                claims.get("email", String.class),
                claims.get("object", String.class));

        if (!isVerified)
            throw new TokenException("Email Could not be verified!");

        return ResponseEntity.ok(Map.of("message", "Email was successfully verified."));
    }
}
