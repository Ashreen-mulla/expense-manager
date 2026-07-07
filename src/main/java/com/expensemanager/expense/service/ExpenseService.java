package com.expensemanager.expense.service;

import com.expensemanager.expense.dto.CreateExpenseRequest;
import com.expensemanager.expense.dto.ExpenseResponse;
import java.util.List;

public interface ExpenseService {

    ExpenseResponse createExpense(CreateExpenseRequest request);
    List<ExpenseResponse> getMyExpenses();
}