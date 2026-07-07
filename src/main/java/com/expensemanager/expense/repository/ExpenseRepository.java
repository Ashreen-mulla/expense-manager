package com.expensemanager.expense.repository;

import com.expensemanager.auth.entity.User;
import com.expensemanager.expense.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);
}