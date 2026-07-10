package com.expensemanager.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class MonthlySpendingResponse {

    private Integer year;

    private Integer month;

    private BigDecimal amount;
}