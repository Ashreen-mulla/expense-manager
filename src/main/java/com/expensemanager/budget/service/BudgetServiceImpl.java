package com.expensemanager.budget.service;

import com.expensemanager.auth.entity.User;
import com.expensemanager.auth.repository.UserRepository;
import com.expensemanager.budget.dto.BudgetResponse;
import com.expensemanager.budget.dto.CreateBudgetRequest;
import com.expensemanager.budget.entity.Budget;
import com.expensemanager.budget.repository.BudgetRepository;
import com.expensemanager.budget.dto.UpdateBudgetRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    @Override
    public BudgetResponse createBudget(CreateBudgetRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        budgetRepository.findByUserAndMonthAndYear(
                user,
                request.getMonth(),
                request.getYear()
        ).ifPresent(budget -> {
            throw new RuntimeException("Budget already exists for this month");
        });

        Budget budget = new Budget();
        budget.setAmount(request.getAmount());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setUser(user);

        Budget savedBudget = budgetRepository.save(budget);

        BudgetResponse response = new BudgetResponse();
        response.setId(savedBudget.getId());
        response.setAmount(savedBudget.getAmount());
        response.setMonth(savedBudget.getMonth());
        response.setYear(savedBudget.getYear());

        return response;
    }

    @Override
    public List<BudgetResponse> getMyBudgets() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        return budgetRepository.findByUser(user)
                .stream()
                .map(budget -> {
                    BudgetResponse response = new BudgetResponse();
                    response.setId(budget.getId());
                    response.setAmount(budget.getAmount());
                    response.setMonth(budget.getMonth());
                    response.setYear(budget.getYear());
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public BudgetResponse updateBudget(Long id, UpdateBudgetRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Budget budget = budgetRepository.findById(id)
                .orElseThrow();

        if (!budget.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Budget not found");
        }

        budgetRepository.findByUserAndMonthAndYear(
                user,
                request.getMonth(),
                request.getYear()
        ).ifPresent(existingBudget -> {
            if (!existingBudget.getId().equals(id)) {
                throw new RuntimeException("Budget already exists for this month");
            }
        });

        budget.setAmount(request.getAmount());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());

        Budget updatedBudget = budgetRepository.save(budget);

        BudgetResponse response = new BudgetResponse();
        response.setId(updatedBudget.getId());
        response.setAmount(updatedBudget.getAmount());
        response.setMonth(updatedBudget.getMonth());
        response.setYear(updatedBudget.getYear());

        return response;
    }

    @Override
    public void deleteBudget(Long id) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Budget budget = budgetRepository.findById(id)
                .orElseThrow();

        if (!budget.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Budget not found");
        }

        budgetRepository.delete(budget);
    }
}