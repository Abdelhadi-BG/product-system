package com.example.productapp.service;

import com.example.productapp.model.Product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService {
    Product saveProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(UUID id);
    Product updateProduct(UUID id, Product productDetails);
    void deleteProduct(UUID id);
}
