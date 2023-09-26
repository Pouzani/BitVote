package com.bitvote.project.security.auth;

import com.bitvote.project.user.Role;

public record AuthenticationResponse(String username, String accessToken, String refreshToken, Role role) {
}
