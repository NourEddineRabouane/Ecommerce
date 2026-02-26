package com.example.ecommerce.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/category")
    private ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(categoryService.getCategories());
    }
}
