package com.example.ecommerce.authentication.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AuthRequestDto {
    private String email;
    private String password;
}
