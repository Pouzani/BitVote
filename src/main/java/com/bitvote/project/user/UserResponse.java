package com.bitvote.project.user;

public record UserResponse(Long id, String username, String email, Role role, String imageUrl, Integer age, String phone) {
}
