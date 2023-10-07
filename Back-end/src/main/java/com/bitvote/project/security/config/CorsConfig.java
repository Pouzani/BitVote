package com.bitvote.project.security.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class CorsConfig implements CorsConfigurationSource {
    @Value("${application.security.cors.allowed-origins}")
    private String origin;
    /**
     * The getCorsConfiguration function is used to configure the CORS policy for the resource.
     * The method returns null for the defined origin, headers, and methods in order to allow any origin access to the API.
     * This configuration is suitable only for development environments where you want quick and easy access from a browser.

     *
     * @param HttpServletRequest request Get the origin of the request
     *
     * @return A corsconfiguration object
     *
     * @docauthor Trelent
     */
    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin(origin);
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);
        return config;
    }
}
