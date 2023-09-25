package com.bitvote.project.security.auth;

import com.bitvote.project.security.config.JwtService;
import com.bitvote.project.user.User;
import com.bitvote.project.user.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthenticationResponse register(User user){
        var authUser = User.builder()
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .role(user.getRole())
                .age(user.getAge())
                .email(user.getEmail())
                .phone(user.getPhone())
                .imageUrl(user.getImageUrl())
                .build();
        var savedUser = userRepository.save(authUser);
        var jwtToken = jwtService.generateToken(savedUser);
        return new AuthenticationResponse(savedUser.getUsername(),jwtToken,savedUser.getRole());
    }

    public AuthenticationResponse login(@NotNull AuthenticationRequest request){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(),request.password()));
        }
        catch(BadCredentialsException e){
            throw new BadCredentialsException("Invalid username or password");
        }
        var user = userRepository.findByUsername(request.username()).orElse(new User());
        var jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(user.getUsername(),jwtToken,user.getRole());
    }
}
