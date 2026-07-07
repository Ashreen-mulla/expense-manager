package com.expensemanager.expense.service;

import com.expensemanager.auth.entity.User;
import com.expensemanager.auth.repository.UserRepository;
import com.expensemanager.expense.dto.CreateExpenseRequest;
import com.expensemanager.expense.dto.ExpenseResponse;
import com.expensemanager.expense.entity.Expense;
import com.expensemanager.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Override
    public ExpenseResponse createExpense(CreateExpenseRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Expense expense = new Expense();

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setUser(user);

        Expense savedExpense = expenseRepository.save(expense);

        ExpenseResponse response = new ExpenseResponse();

        response.setId(savedExpense.getId());
        response.setTitle(savedExpense.getTitle());
        response.setAmount(savedExpense.getAmount());
        response.setDescription(savedExpense.getDescription());
        response.setExpenseDate(savedExpense.getExpenseDate());

        return response;
    }

    @Override
    public List<ExpenseResponse> getMyExpenses() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        return expenseRepository.findByUser(user)
                .stream()
                .map(expense -> {

                    ExpenseResponse response = new ExpenseResponse();

                    response.setId(expense.getId());
                    response.setTitle(expense.getTitle());
                    response.setAmount(expense.getAmount());
                    response.setDescription(expense.getDescription());
                    response.setExpenseDate(expense.getExpenseDate());

                    return response;
                })
                .collect(Collectors.toList());
    }
}