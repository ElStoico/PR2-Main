package com.coupon.cuponservice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.modules.Coupon.dto.CouponDto;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/coupons")
public class CouponController {
    @GetMapping("path")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @GetMapping("/get-coupon/{code}")
    public String getCoupon(@PathVariable String code) {
        return CouponDto.builder()
                .id("1")
                .code(code)
                .discount(10.0)
                .description("10% off on your next purchase")
                .expirationDate(LocalDateTime.now().plusDays(30))
                .build()
                .toString();
    }
    
}
