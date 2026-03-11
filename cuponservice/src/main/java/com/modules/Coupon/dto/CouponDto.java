package com.modules.Coupon.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponDto {
    private String id;
    private String code;
    private double discount;
    private String description;
    private LocalDateTime expirationDate;
}