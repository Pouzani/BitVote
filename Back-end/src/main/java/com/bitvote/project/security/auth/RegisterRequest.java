package com.bitvote.project.security.auth;

import com.bitvote.project.security.password.validation.ValidPassword;
import com.bitvote.project.user.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(@NotBlank(message = "Email must not be empty")
                              @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email must be valid")
                              String email,
                              @NotBlank(message = "Username must not be empty")
                              String username,
                              @NotBlank(message = "Password must not be empty")
                              @ValidPassword
                              @Column(nullable = false)
                              String password,
                              Role role,
                              String imageUrl,
                              Integer age,
                              String phone
                              ) {
}
