package com.expensemanager.auth.service;

import com.expensemanager.auth.dto.LoginRequest;
import com.expensemanager.auth.dto.LoginResponse;
import com.expensemanager.auth.dto.RegisterRequest;
import com.expensemanager.auth.dto.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
}