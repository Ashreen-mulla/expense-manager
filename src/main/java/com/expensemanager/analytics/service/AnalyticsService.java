package com.expensemanager.analytics.service;

import com.expensemanager.analytics.dto.DashboardResponse;
import com.expensemanager.analytics.dto.CategorySpendingResponse;
import com.expensemanager.analytics.dto.MonthlySpendingResponse;
import com.expensemanager.expense.dto.ExpenseResponse;

import java.util.List;

public interface AnalyticsService {

    DashboardResponse getDashboard();

    List<CategorySpendingResponse> getCategorySpending();

    List<MonthlySpendingResponse> getMonthlySpending();

    List<ExpenseResponse> getRecentExpenses();

    ExpenseResponse getBiggestExpense();
}