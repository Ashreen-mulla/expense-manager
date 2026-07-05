package com.expensemanager.auth.service;

import com.expensemanager.auth.dto.RegisterRequest;
import com.expensemanager.auth.dto.RegisterResponse;
import com.expensemanager.auth.entity.Role;
import com.expensemanager.auth.entity.User;
import com.expensemanager.auth.mapper.UserMapper;
import com.expensemanager.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public RegisterResponse register(RegisterRequest request) {

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        return userMapper.toRegisterResponse(savedUser);
    }
}