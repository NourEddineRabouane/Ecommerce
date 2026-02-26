package com.example.ecommerce.image;

import com.example.ecommerce.product.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "images")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Image implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
