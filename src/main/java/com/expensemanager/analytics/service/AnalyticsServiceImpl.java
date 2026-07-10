package com.expensemanager.analytics.service;

import com.expensemanager.analytics.dto.DashboardResponse;
import com.expensemanager.auth.entity.User;
import com.expensemanager.auth.repository.UserRepository;
import com.expensemanager.budget.entity.Budget;
import com.expensemanager.budget.repository.BudgetRepository;
import com.expensemanager.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.expensemanager.analytics.dto.CategorySpendingResponse;
import com.expensemanager.analytics.dto.MonthlySpendingResponse;
import com.expensemanager.expense.dto.ExpenseResponse;
import com.expensemanager.expense.entity.Expense;
import java.util.stream.Collectors;

import java.util.List;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    @Override
    public DashboardResponse getDashboard() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        LocalDate now = LocalDate.now();

        Budget budget = budgetRepository
                .findByUserAndMonthAndYear(
                        user,
                        now.getMonthValue(),
                        now.getYear()
                )
                .orElse(null);

        BigDecimal totalBudget = budget != null
                ? budget.getAmount()
                : BigDecimal.ZERO;

        BigDecimal totalSpent = expenseRepository.getTotalSpentBetween(
                user,
                now.withDayOfMonth(1),
                now.withDayOfMonth(now.lengthOfMonth())
        );

        DashboardResponse response = new DashboardResponse();

        response.setTotalBudget(totalBudget);
        response.setTotalSpent(totalSpent);
        response.setRemainingBudget(totalBudget.subtract(totalSpent));
        response.setExpenseCount(expenseRepository.countByUser(user));

        BigDecimal percentage = BigDecimal.ZERO;

        if (totalBudget.compareTo(BigDecimal.ZERO) > 0) {

            percentage = totalSpent
                    .multiply(BigDecimal.valueOf(100))
                    .divide(
                            totalBudget,
                            2,
                            java.math.RoundingMode.HALF_UP
                    );
        }

        response.setBudgetUsagePercentage(percentage);
        response.setOverBudget(totalSpent.compareTo(totalBudget) > 0);

        return response;
    }

    @Override
    public List<CategorySpendingResponse> getCategorySpending() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return expenseRepository.getCategorySpending(user);
    }

    @Override
    public List<MonthlySpendingResponse> getMonthlySpending() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return expenseRepository.getMonthlySpending(user);
    }

    @Override
    public List<ExpenseResponse> getRecentExpenses() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return expenseRepository
                .findTop5ByUserOrderByExpenseDateDescIdDesc(user)
                .stream()
                .map(expense -> {

                    ExpenseResponse response = new ExpenseResponse();

                    response.setId(expense.getId());
                    response.setTitle(expense.getTitle());
                    response.setAmount(expense.getAmount());
                    response.setDescription(expense.getDescription());
                    response.setExpenseDate(expense.getExpenseDate());
                    response.setCategoryId(expense.getCategory().getId());
                    response.setCategoryName(expense.getCategory().getName());

                    return response;

                })
                .collect(Collectors.toList());
    }

    @Override
    public ExpenseResponse getBiggestExpense() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Expense expense = expenseRepository
                .findTopByUserOrderByAmountDesc(user)
                .orElseThrow();

        ExpenseResponse response = new ExpenseResponse();

        response.setId(expense.getId());
        response.setTitle(expense.getTitle());
        response.setAmount(expense.getAmount());
        response.setDescription(expense.getDescription());
        response.setExpenseDate(expense.getExpenseDate());
        response.setCategoryId(expense.getCategory().getId());
        response.setCategoryName(expense.getCategory().getName());

        return response;
    }
}