package com.expensemanager.expense.repository;

import com.expensemanager.auth.entity.User;
import com.expensemanager.expense.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.expensemanager.analytics.dto.CategorySpendingResponse;
import com.expensemanager.analytics.dto.MonthlySpendingResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);

    List<Expense> findTop5ByUserOrderByExpenseDateDescIdDesc(User user);

    Optional<Expense> findTopByUserOrderByAmountDesc(User user);

    @Query("""
            SELECT COALESCE(SUM(e.amount), 0)
            FROM Expense e
            WHERE e.user = :user
            AND e.expenseDate BETWEEN :startDate AND :endDate
            """)
    BigDecimal getTotalSpentBetween(
            @Param("user") User user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("""
       SELECT new com.expensemanager.analytics.dto.CategorySpendingResponse(
            c.name,
            SUM(e.amount)
       )
       FROM Expense e
       JOIN e.category c
       WHERE e.user = :user
       GROUP BY c.name
       ORDER BY SUM(e.amount) DESC
       """)
    List<CategorySpendingResponse> getCategorySpending(
            @Param("user") User user
    );

    @Query("""
       SELECT new com.expensemanager.analytics.dto.MonthlySpendingResponse(
            YEAR(e.expenseDate),
            MONTH(e.expenseDate),
            SUM(e.amount)
       )
       FROM Expense e
       WHERE e.user = :user
       GROUP BY YEAR(e.expenseDate), MONTH(e.expenseDate)
       ORDER BY YEAR(e.expenseDate), MONTH(e.expenseDate)
       """)
    List<MonthlySpendingResponse> getMonthlySpending(
            @Param("user") User user
    );

    long countByUser(User user);
}