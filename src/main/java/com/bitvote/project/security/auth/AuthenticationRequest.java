package com.bitvote.project.security.auth;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationRequest(@NotBlank String username,@NotBlank String password) {
}
