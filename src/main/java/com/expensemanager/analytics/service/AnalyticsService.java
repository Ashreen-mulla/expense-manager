package com.expensemanager.analytics.service;

import com.expensemanager.analytics.dto.DashboardResponse;
import com.expensemanager.analytics.dto.CategorySpendingResponse;

import java.util.List;

public interface AnalyticsService {

    DashboardResponse getDashboard();

    List<CategorySpendingResponse> getCategorySpending();
}