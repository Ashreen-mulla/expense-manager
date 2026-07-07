package com.expensemanager.budget.service;

import com.expensemanager.budget.dto.BudgetResponse;
import com.expensemanager.budget.dto.CreateBudgetRequest;
import com.expensemanager.budget.dto.UpdateBudgetRequest;

import java.util.List;

public interface BudgetService {

    BudgetResponse createBudget(CreateBudgetRequest request);

    List<BudgetResponse> getMyBudgets();

    BudgetResponse updateBudget(Long id, UpdateBudgetRequest request);

    void deleteBudget(Long id);
}