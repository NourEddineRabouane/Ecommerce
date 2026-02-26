package com.example.ecommerce.product;

import com.cloudinary.Cloudinary;
import com.example.ecommerce.category.Category;
import com.example.ecommerce.category.CategoryRepository;
import com.example.ecommerce.image.Image;
import com.example.ecommerce.image.ImageRepository;
import com.example.ecommerce.image.ImageUploadService;
import com.example.ecommerce.product.dto.ProductRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    public List<Product> getProducts(){
        return   productRepository.findAll();
    }

    public Optional<Product> getProduct(Long id){
        return productRepository.findById(id);
    }

    public Product createProduct(ProductRequestDto productDto , List<MultipartFile> images) throws IOException {
        // Find the category to link it to the product
        Category category = categoryRepository.findById(productDto.getCategoryId()).orElseThrow();

        // Create the product
        Product product = Product.builder()
                .name( productDto.getName())
                .description( productDto.getDescription())
                .price( productDto.getPrice())
                .stockQuantity( productDto.getStockQuantity())
                .category(category)
                .build();

        productRepository.save(product);

        // Save images to the cloud
        List<Image> imageList = new ArrayList<>();

        for ( MultipartFile image : images){
            Map<String, String> uploadResul = imageUploadService.upload(image);

            Image image1 = Image.builder()
                    .url(uploadResul.get("url"))
                    .product(product)
                    .build();

            imageList.add(image1);
        }

        imageRepository.saveAll(imageList);
        product.setImages(imageList);

        return product;
    }
}
