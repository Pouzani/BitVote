package com.bitvote.project.security.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthenticationRequest(@NotBlank
                                    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
                                    String username,
                                    @NotBlank
                                    @Size(min = 6, message = "Password must have 6 characters")
                                    String password) {
}
