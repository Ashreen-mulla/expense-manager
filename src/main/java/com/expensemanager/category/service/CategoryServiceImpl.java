package com.expensemanager.category.service;

import com.expensemanager.auth.entity.User;
import com.expensemanager.auth.repository.UserRepository;
import com.expensemanager.category.dto.CategoryResponse;
import com.expensemanager.category.dto.CreateCategoryRequest;
import com.expensemanager.category.entity.Category;
import com.expensemanager.category.repository.CategoryRepository;
import com.expensemanager.category.dto.UpdateCategoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public CategoryResponse createCategory(CreateCategoryRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Category category = new Category();
        category.setName(request.getName());
        category.setUser(user);

        Category savedCategory = categoryRepository.save(category);

        CategoryResponse response = new CategoryResponse();
        response.setId(savedCategory.getId());
        response.setName(savedCategory.getName());

        return response;
    }

    @Override
    public List<CategoryResponse> getMyCategories() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        return categoryRepository.findByUser(user)
                .stream()
                .map(category -> {
                    CategoryResponse response = new CategoryResponse();
                    response.setId(category.getId());
                    response.setName(category.getName());
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse updateCategory(Long id, UpdateCategoryRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Category category = categoryRepository.findById(id)
                .orElseThrow();

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Category not found");
        }

        category.setName(request.getName());

        Category updatedCategory = categoryRepository.save(category);

        CategoryResponse response = new CategoryResponse();
        response.setId(updatedCategory.getId());
        response.setName(updatedCategory.getName());

        return response;
    }

    @Override
    public void deleteCategory(Long id) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Category category = categoryRepository.findById(id)
                .orElseThrow();

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Category not found");
        }

        categoryRepository.delete(category);
    }
}