package com.example.ecommerce.utils;

import io.jsonwebtoken.Claims;

public interface JwtUtilEmailVerificationInterface {
    public String generateToken(Long userId, String email);
    public Claims isTokenValid(String token); // Verify if the token is valid and return the claims
    public String generateVerificationUrl(String token);
}
