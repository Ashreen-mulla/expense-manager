package com.expensemanager.analytics.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DashboardResponse {

    private BigDecimal totalBudget;

    private BigDecimal totalSpent;

    private BigDecimal remainingBudget;

    private Long expenseCount;

    private BigDecimal budgetUsagePercentage;

    private Boolean overBudget;
}