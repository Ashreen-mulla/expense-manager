package com.expensemanager.budget.repository;

import com.expensemanager.auth.entity.User;
import com.expensemanager.budget.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findByUser(User user);

    Optional<Budget> findByUserAndMonthAndYear(
            User user,
            Integer month,
            Integer year
    );
}