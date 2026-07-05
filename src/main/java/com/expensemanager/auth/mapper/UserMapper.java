package com.expensemanager.auth.mapper;

import com.expensemanager.auth.dto.RegisterResponse;
import com.expensemanager.auth.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    RegisterResponse toRegisterResponse(User user);
}