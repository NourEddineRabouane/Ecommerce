package com.example.ecommerce.image.dto;

import jakarta.persistence.GeneratedValue;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ImageResponseDto {
    private Long id;
    private String url;
}
