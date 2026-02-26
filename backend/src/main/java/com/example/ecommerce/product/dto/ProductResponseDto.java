package com.example.ecommerce.product.dto;

import com.example.ecommerce.image.dto.ImageResponseDto;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductResponseDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String category;
    private List<ImageResponseDto> images;
}
