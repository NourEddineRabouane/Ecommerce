package com.example.ecommerce.product.mapper;

import com.example.ecommerce.image.dto.ImageResponseDto;
import com.example.ecommerce.product.Product;
import com.example.ecommerce.product.dto.ProductResponseDto;

public class ProductResponseMapper {

    public static ProductResponseDto toDto(Product product){

        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .category(product.getCategory().getName())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .images(
                        product.getImages()
                                .stream()
                                .map(
                                        image -> ImageResponseDto.builder()
                                                .id(image.getId())
                                                .url(image.getUrl())
                                                .build()
                                ).toList()
                )
                .build();
    }
}
