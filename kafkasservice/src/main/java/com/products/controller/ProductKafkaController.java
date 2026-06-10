package com.products.controller;

import com.products.dto.ProductDto;
import com.products.service.AlmacenService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/kafka-api")
@RequiredArgsConstructor
public class ProductKafkaController {
    private final ProductProducer productProducer;
    private final AlmacenService almacenService;

    @PostMapping("/enviar")
    public ResponseEntity<String> enviarProducto(@RequestBody ProductDto productDto) {
        productProducer.enviarProducto(productDto);
        return ResponseEntity.ok("Producto enviado al topic: " + productDto.getName());
    }

    @PostMapping("/create-product")
    public ResponseEntity<Object> createProduct(@RequestBody ProductDto productDto) {
        try{
            Object response = almacenService.createProductoAlmacen(productDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al enviar el producto a Kafka: " + e.getMessage());
        }
    }
}