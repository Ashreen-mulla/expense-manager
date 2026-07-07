package com.expensemanager.expense.service;

import com.expensemanager.expense.dto.CreateExpenseRequest;
import com.expensemanager.expense.dto.ExpenseResponse;

public interface ExpenseService {

    ExpenseResponse createExpense(CreateExpenseRequest request);
}