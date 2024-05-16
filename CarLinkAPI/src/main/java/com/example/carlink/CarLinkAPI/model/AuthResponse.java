package com.example.carlink.CarLinkAPI.model;

public class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    // Getters
    public String getToken() {
        return token;
    }
}