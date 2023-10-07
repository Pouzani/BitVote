package com.bitvote.project.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@ControllerAdvice
public class ApiExceptionHandler{

    @ExceptionHandler(value = ApiRequestException.class)
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e){
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Object> handleApiRequestException(Exception e){
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }
    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<Object> handleApiRequestException(UserNotFoundException e){
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<Object> handleApiRequestException(BadCredentialsException e){
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<Object> handleApiRequestException(AccessDeniedException e){
        HttpStatus httpStatus = HttpStatus.FORBIDDEN;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = ExpiredJwtException.class)
    public ResponseEntity<Object> handleApiRequestException(ExpiredJwtException e){
        System.out.println("hh");
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleApiRequestException(MethodArgumentNotValidException e){
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        Map<String,String> messages = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            messages.put(fieldName,errorMessage);
        });
        InvalidArgumentsException apiException = new InvalidArgumentsException(messages,httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }


}