package com.example.productapp.service.impl;

import com.example.productapp.exception.ResourceNotFoundException;
import com.example.productapp.model.Product;
import com.example.productapp.repository.ProductRepository;
import com.example.productapp.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public Product updateProduct(UUID id, Product productDetails) {
        Product product = getProductById(id);
        
        // Update the product details
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setImageUrl(productDetails.getImageUrl());
        product.setCategory(productDetails.getCategory());
        product.setSku(productDetails.getSku());
        product.setBrand(productDetails.getBrand());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setWeight(productDetails.getWeight());
        product.setDimensions(productDetails.getDimensions());
        product.setManufacturer(productDetails.getManufacturer());
        product.setActive(productDetails.isActive());
        
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(UUID id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
