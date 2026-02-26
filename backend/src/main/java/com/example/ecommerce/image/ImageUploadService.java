package com.example.ecommerce.image;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ImageUploadService {

    @Autowired
    private final Cloudinary cloudinary;

    public Map<String, String> upload(MultipartFile file) throws IOException {
        Map<? ,?>  uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                Map.of(
                        "folder", "products",
                        "resource_type", "image"
                )
        );

        return Map.of(
                "url", (String) uploadResult.get("secure_url")
        );
    }
}
