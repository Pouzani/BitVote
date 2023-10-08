package com.bitvote.project.security.auth;

import com.bitvote.project.exceptions.UserNotFoundException;
import com.bitvote.project.security.config.JwtService;
import com.bitvote.project.security.token.Token;
import com.bitvote.project.security.token.TokenRepository;
import com.bitvote.project.security.token.TokenType;
import com.bitvote.project.user.*;
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
    private final UserDTOMapper userDTOMapper;

    /**
     * The register function is used to register a new user.
     *
     *
     * @param RegisterRequest request Get the username, password, age, email and phone from the user
     *
     * @return A new authenticationresponse object
     *
     * @docauthor Trelent
     */
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
        return new AuthenticationResponse(savedUser.getUsername(), savedUser.getId(), accessToken,refreshToken,savedUser.getRole());
    }

    /**
     * The login function is used to authenticate a user.
     *
     *
     * @param @NotNull AuthenticationRequest request Get the username and password from the request body
     *
     * @return An authenticationresponse object
     *
     * @docauthor Trelent
     */
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
        return new AuthenticationResponse(user.getUsername(),user.getId(),accessToken, refreshToken,user.getRole());
    }

    /**
     * The saveUserToken function saves the token to the database.
     *
     *
     * @param User user Get the user's id and store it in the token table
     * @param String token Store the token in the database
     *
     * @return A token object
     *
     * @docauthor Trelent
     */
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

    /**
     * The revokeAllUserTokens function is used to revoke all tokens for a given user.
     * This function is called when the user logs out, or when their account is deleted.
     *
     *
     * @param User user Identify the user whose tokens are to be revoked
     *
     * @return Nothing
     *
     * @docauthor Trelent
     */
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

    /**
     * The refreshToken function is used to refresh the user's access token.
     * It takes in a String token, which is the user's current access token.
     * The function then extracts the username from this access token using jwtService.extractUsername(token).
     * If this username exists, it finds and stores that User object in storedUser using: var storedUser = userRepository.findByUsername(username).orElseThrow(()-&gt;new UserNotFoundException(&quot;User with username: &quot;+username+&quot; not found&quot;));
     * Then it checks if the given accessToken is valid for that particular User by
     *
     * @param String token Extract the username from the token
     *
     * @return An authenticationresponse object
     *
     * @docauthor Trelent
     */
    public AuthenticationResponse refreshToken(String token){
        var username = jwtService.extractUsername(token);
        if (username != null){
            var storedUser = userRepository.findByUsername(username).orElseThrow(()->new UserNotFoundException("User with username: "+username+" not found"));
            if(jwtService.isTokenValid(token,storedUser)){
                revokeAllUserTokens(storedUser);
                var accessToken = jwtService.generateToken(storedUser);
                saveUserToken(storedUser,accessToken);
                return new AuthenticationResponse(storedUser.getUsername(),storedUser.getId(),accessToken,token,storedUser.getRole());
            }
        }
        return null;
    }

    public UserResponse getCurrentUser(User user){
        return userDTOMapper.apply(user);
    }
}
