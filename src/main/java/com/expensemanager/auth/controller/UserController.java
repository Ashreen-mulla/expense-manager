package com.expensemanager.auth.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/v1/me")
    public String me(Authentication authentication) {

        if (authentication == null) {
            return "Not Authenticated";
        }

        return authentication.getName();
    }
}