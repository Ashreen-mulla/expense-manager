package com.expensemanager.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CategorySpendingResponse {

    private String category;

    private BigDecimal amount;
}