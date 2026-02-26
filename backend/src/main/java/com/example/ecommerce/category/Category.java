package com.example.ecommerce.category;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table( name = "category")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Category implements Serializable {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;


}
