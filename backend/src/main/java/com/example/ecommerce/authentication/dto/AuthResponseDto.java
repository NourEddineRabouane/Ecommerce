package com.example.ecommerce.authentication.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class AuthResponseDto {
    private String token;
}
