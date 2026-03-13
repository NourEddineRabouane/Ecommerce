package com.example.ecommerce.utils;

import com.example.ecommerce.exception.TokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtilEmailVerification implements JwtUtilEmailVerificationInterface {

    private final String SECRET = "Zu+1JKiTQzZhNI7P6q7vIGZ6n/LCUYPUk=nZvFQtcVyx";
    @Value("${spring.app.backendurl}")
    private String backendUrl;

    private Key getVerificationKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public String generateToken(Long userId, String email) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("email", email)
                .claim("object", "email_verification")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 20)) // 20 minutes
                .signWith(getVerificationKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public Claims isTokenValid(String token) {
        Claims claims = null;
        try{
            Key key = getVerificationKey();

            claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws( token )
                    .getBody();

        } catch ( ExpiredJwtException e){
            throw  new TokenException("Token was expired!");
        } catch ( JwtException e){
            throw new TokenException("Token is invalid!");
        }
        return claims;
    }

    @Override
    public String generateVerificationUrl(String token) {
        return backendUrl + "?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8);
    }
}
