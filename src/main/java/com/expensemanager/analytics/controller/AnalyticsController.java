package com.expensemanager.analytics.controller;

import com.expensemanager.analytics.dto.DashboardResponse;
import com.expensemanager.analytics.service.AnalyticsService;
import com.expensemanager.expense.dto.ExpenseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.expensemanager.analytics.dto.CategorySpendingResponse;
import com.expensemanager.analytics.dto.MonthlySpendingResponse;
import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard() {
        return analyticsService.getDashboard();
    }

    @GetMapping("/category-spending")
    public List<CategorySpendingResponse> getCategorySpending() {
        return analyticsService.getCategorySpending();
    }

    @GetMapping("/monthly-spending")
    public List<MonthlySpendingResponse> getMonthlySpending() {
        return analyticsService.getMonthlySpending();
    }

    @GetMapping("/recent-expenses")
    public List<ExpenseResponse> getRecentExpenses() {
        return analyticsService.getRecentExpenses();
    }

    @GetMapping("/biggest-expense")
    public ExpenseResponse getBiggestExpense() {
        return analyticsService.getBiggestExpense();
    }
}