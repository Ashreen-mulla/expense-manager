package com.expensemanager.category.repository;

import com.expensemanager.auth.entity.User;
import com.expensemanager.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUser(User user);
}