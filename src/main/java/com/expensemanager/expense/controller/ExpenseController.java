package com.expensemanager.expense.controller;

import com.expensemanager.expense.dto.CreateExpenseRequest;
import com.expensemanager.expense.dto.ExpenseResponse;
import com.expensemanager.expense.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExpenseResponse createExpense(
            @Valid @RequestBody CreateExpenseRequest request) {

        return expenseService.createExpense(request);
    }

    @GetMapping
    public List<ExpenseResponse> getMyExpenses() {
        return expenseService.getMyExpenses();
    }
}