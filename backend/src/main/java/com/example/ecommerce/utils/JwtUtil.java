package com.example.ecommerce.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET="nZv7vIGZ6n/LzZhNCUYFQtcVyxZu+1JKiTQI7P6qPUk=";

    private Key getSigningKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Generate the key for the user with an email
    public String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt( new Date(System.currentTimeMillis()))
                .setExpiration( new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
                .signWith( getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract email from token
    public  String extractEmail( String token){
        return Jwts.parserBuilder()
                .setSigningKey( getSigningKey())
                .build()
                .parseClaimsJws( token)
                .getBody()
                .getSubject();
    }

    // Check token validity
    public boolean isTokenValid( String token, String emailFromUserDetails){
        final String emailFromToken = extractEmail( token);
        return (emailFromToken.equals(emailFromUserDetails) && !isTokenExpired(token));
    }

    // Check token Expiration
    private boolean isTokenExpired(String token){
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());

    }
}
