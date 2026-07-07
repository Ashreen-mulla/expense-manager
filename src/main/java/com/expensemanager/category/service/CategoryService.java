package com.expensemanager.category.service;

import com.expensemanager.category.dto.CategoryResponse;
import com.expensemanager.category.dto.CreateCategoryRequest;
import com.expensemanager.category.dto.UpdateCategoryRequest;

import java.util.List;

public interface CategoryService {

    CategoryResponse createCategory(CreateCategoryRequest request);

    List<CategoryResponse> getMyCategories();

    CategoryResponse updateCategory(Long id, UpdateCategoryRequest request);

    void deleteCategory(Long id);
}