package com.expensemanager.auth.service;

import com.expensemanager.auth.dto.RegisterRequest;
import com.expensemanager.auth.dto.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);
}