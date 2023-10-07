package com.bitvote.project.security.config;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfigurationSource;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFiler;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutService logoutHandler;
    private final CorsConfig corsConfigurationSource;

    /**
     * The securityFilterChain function is a bean definition that creates a Spring Security Filter Chain.
     * The filter chain is used to apply security filters to incoming requests.
     * In this case, the filter chain applies the JWT Authentication Filter and CORS configuration before any other filters are applied.

     *
     * @param HttpSecurity http Configure the security filter chain
     *
     * @return A securityfilterchain, which is a collection of filters that are used to secure the application
     *
     * @docauthor Trelent
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/v1/auth/**","/api/v1/coins/**").permitAll()
                        .requestMatchers(GET, "/api/v1/votes/**").permitAll()
                        .requestMatchers(GET, "/api/v1/forum/**").permitAll())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(POST,"/api/v1/votes/**").hasAnyAuthority("USER","ADMIN")
                        .requestMatchers(POST,"/api/v1/forum/**").hasAnyAuthority("USER","ADMIN")
                        .requestMatchers(PUT,"/api/v1/forum/**").hasAnyAuthority("USER","ADMIN")
                        .requestMatchers(DELETE,"/api/v1/forum/**").hasAnyAuthority("USER","ADMIN")
                        .requestMatchers("/api/v1/user/**").hasAnyAuthority("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFiler, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout.logoutUrl("/api/v1/auth/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext()));

        return http.build();
    }
}
