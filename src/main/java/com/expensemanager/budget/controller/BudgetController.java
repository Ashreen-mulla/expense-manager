package com.expensemanager.budget.controller;

import com.expensemanager.budget.dto.BudgetResponse;
import com.expensemanager.budget.dto.CreateBudgetRequest;
import com.expensemanager.budget.service.BudgetService;
import com.expensemanager.budget.dto.UpdateBudgetRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BudgetResponse createBudget(
            @Valid @RequestBody CreateBudgetRequest request) {

        return budgetService.createBudget(request);
    }

    @GetMapping
    public List<BudgetResponse> getMyBudgets() {
        return budgetService.getMyBudgets();
    }

    @PutMapping("/{id}")
    public BudgetResponse updateBudget(
            @PathVariable Long id,
            @Valid @RequestBody UpdateBudgetRequest request) {

        return budgetService.updateBudget(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBudget(@PathVariable Long id) {

        budgetService.deleteBudget(id);
    }
}