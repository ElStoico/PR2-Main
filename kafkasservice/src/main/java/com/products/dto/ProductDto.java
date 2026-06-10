package com.products.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private String name;
    private String description;
    private double price;
    private Integer quantity;
    private String image;
    private String category;
    private String subcategory;
    private String brand;
    private String supplier;
    private String id;
}
