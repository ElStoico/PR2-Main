package com.products.controller;

import com.products.dto.ProductDto;
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

    @PostMapping("/enviar")
    public ResponseEntity<String> enviarProducto(@RequestBody ProductDto productDto) {
        productProducer.enviarProducto(productDto);
        return ResponseEntity.ok("Producto enviado al topic: " + productDto.getName());
    }
}