package com.bitvote.project.security.auth;

import com.bitvote.project.exceptions.UserNotFoundException;
import com.bitvote.project.security.config.JwtService;
import com.bitvote.project.security.token.Token;
import com.bitvote.project.security.token.TokenRepository;
import com.bitvote.project.security.token.TokenType;
import com.bitvote.project.user.Role;
import com.bitvote.project.user.User;
import com.bitvote.project.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    public AuthenticationResponse register(RegisterRequest request){
        var authUser = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .age(request.age())
                .email(request.email())
                .phone(request.phone())
                .imageUrl(request.imageUrl())
                .build();
        var savedUser = userRepository.save(authUser);
        var accessToken = jwtService.generateToken(savedUser);
        var refreshToken = jwtService.generateRefreshToken(savedUser);
        saveUserToken(savedUser,accessToken);
        return new AuthenticationResponse(savedUser.getUsername(),accessToken,refreshToken,savedUser.getRole());
    }

    public AuthenticationResponse login(@NotNull AuthenticationRequest request){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(),request.password()));
        }
        catch(BadCredentialsException e){
            throw new BadCredentialsException("Invalid username or password");
        }
        var user = userRepository.findByUsername(request.username()).orElse(new User());
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(user,accessToken);
        return new AuthenticationResponse(user.getUsername(),accessToken, refreshToken,user.getRole());
    }

    private void saveUserToken(User user, String token){
        var storeToken = Token.builder()
                .token(token)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .user(user)
                .build();
        tokenRepository.save(storeToken);
    }

    private void revokeAllUserTokens(User user){
        var validUserTokens = tokenRepository.findAllValidTokenByUserId(user.getId());
        if (validUserTokens.isEmpty()){
            return;
        }
        validUserTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException{
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            throw new BadCredentialsException("Invalid token");
        }
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);
        if (username != null){
            var storedUser = userRepository.findByUsername(username).orElseThrow(()->new UserNotFoundException("User with username: "+username+" not found"));
            if(jwtService.isTokenValid(refreshToken,storedUser)){
                revokeAllUserTokens(storedUser);
                var accessToken = jwtService.generateToken(storedUser);
                saveUserToken(storedUser,accessToken);
                return new AuthenticationResponse(storedUser.getUsername(),accessToken,refreshToken,storedUser.getRole());
            }
        }
        return null;
    }
}
