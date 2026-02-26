package com.example.ecommerce.product;

import com.example.ecommerce.category.Category;
import com.example.ecommerce.image.Image;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Product implements Serializable {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column( length = 1000)
    private String description;

    private BigDecimal price;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @ManyToOne
    @JoinColumn( name = "category_id")
    private Category category;

    @JsonManagedReference
    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Image> images = new ArrayList<>();

    // Helper methods to deal with images
    public void addImage(Image image){
        images.add(image);
        image.setProduct(this);
    }
    public void removeImage(Image image){
        images.remove(image);
        image.setProduct(null);
    }
}
