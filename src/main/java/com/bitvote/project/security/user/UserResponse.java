package com.bitvote.project.security.user;

public record UserResponse(Long id, String username, String email, Role role, String imageUrl, Integer age, String phone) {
}
