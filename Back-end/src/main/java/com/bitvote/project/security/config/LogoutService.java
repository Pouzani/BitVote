package com.bitvote.project.security.config;

import com.bitvote.project.security.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;

    /**
     * The logout function is called when the user logs out of the application.
     * It takes in a request, response and authentication object as parameters.
     * The function first checks if there is an Authorization header in the request, and if it starts with &quot;Bearer &quot;.
     * If so, it extracts the JWT from that header. Then it finds a token with that JWT value in our database using findByToken().
     * If such a token exists (i.e., not null), we set its revoked field to true and save this change to our database using save().
     *
     * @param HttpServletRequest request Get the authorization header from the request
     * @param HttpServletResponse response Send the response back to the client
     * @param Authentication authentication Get the user's details
     *
     * @return Nothing
     *
     * @docauthor Trelent
     */
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        jwt = authHeader.substring(7);
        var storedToken = tokenRepository.findByToken(jwt).orElse(null);
        if (storedToken != null) {
            storedToken.setRevoked(true);
            storedToken.setExpired(true);
            tokenRepository.save(storedToken);
            SecurityContextHolder.clearContext();
        }
    }
}
