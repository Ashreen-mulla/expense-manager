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
}