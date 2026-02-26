package com.example.ecommerce.product;

import com.example.ecommerce.exception.ImageCountException;
import com.example.ecommerce.product.dto.ProductRequestDto;
import com.example.ecommerce.product.dto.ProductResponseDto;
import com.example.ecommerce.product.mapper.ProductResponseMapper;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/product")
    private ResponseEntity<?> getProducts(){
        List<ProductResponseDto> products = productService.getProducts()
                .stream().map(ProductResponseMapper::toDto).toList();

        return ResponseEntity.ok(products);
    }

    @GetMapping("/product/{id}")
    private ResponseEntity<?> getProduct(@PathVariable Long id){
        ProductResponseDto product = productService.getProduct(id).map(ProductResponseMapper::toDto).get();
        return ResponseEntity.ok(product);
    }

    @PostMapping(value = "/product",
                consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    private ResponseEntity<?> createProduct(@Valid @RequestPart("product")ProductRequestDto productDto,
                                            @RequestPart("images") List<MultipartFile> images) throws Exception {

        if ( images.size() > 5 || images.isEmpty()){
            throw new ImageCountException("IMAGE_ERROR","The number of images must be between 1 and 5", HttpStatus.BAD_REQUEST);
        }

        Product product = productService.createProduct( productDto, images);

        return ResponseEntity.ok(ProductResponseMapper.toDto(product));
    }
}
