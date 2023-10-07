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

    /**
     * The handleApiRequestException function is a Spring Boot annotation that handles exceptions thrown by the
     * ApiRequestException class. The function returns an HTTP status code of 400 (BAD_REQUEST) and creates a new
     * ApiException object with the message from the exception, httpStatus, and current time. It then returns this as
     * a ResponseEntity object to be handled by Spring Boot. This allows us to handle errors in our API requests without
     * having to write try/catch blocks for every single request we make! We can simply throw an exception if something goes wrong, and it will be caught here!
     *
     * @param ApiRequestException e Get the message from the exception
     *
     * @return A responseentity object
     */
    @ExceptionHandler(value = ApiRequestException.class)
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e){
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }

    /**
     * The handleApiRequestException function is a function that handles exceptions thrown by the API.
     * It takes in an Exception object and returns a ResponseEntity&lt;Object&gt; object.
     * The HttpStatus variable httpStatus is set to INTERNAL_SERVER_ERROR, which means that the server encountered an unexpected condition which prevented it from fulfilling the request.
     * The ApiException variable apiException is set to a new ApiException with e's message, httpStatus, and ZonedDateTime.now(). This creates an exception with e's message as its errorMessage field, httpStatus as its status field (which will be INTERNAL
     *
     * @param Exception e Catch the exception that is thrown
     *
     * @return An object of type responseentity&lt;object&gt;
     *
     * @docauthor Trelent
     */
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Object> handleApiRequestException(Exception e){
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }
    /**
     * The handleApiRequestException function is a function that handles the UserNotFoundException.
     * It takes in an exception of type UserNotFoundException and returns a ResponseEntity&lt;Object&gt; object.
     * The HttpStatus httpStatus variable is set to HttpStatus.NOT_FOUND, which means that the user was not found in our database.
     * The ApiException apiException variable is set to new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now()), which creates a new instance of the ApiExcepion class with e as its message, httpstatus as its status code and
     *
     * @param UserNotFoundException e Get the message from the exception
     *
     * @return A responseentity&lt;object&gt; object
     *
     * @docauthor Trelent
     */
    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<Object> handleApiRequestException(UserNotFoundException e){
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }

    /**
     * The handleApiRequestException function is a function that handles the BadCredentialsException.
     * It returns an ApiException object with the message, httpStatus, and ZonedDateTime.now() as parameters.
     *
     *
     * @param BadCredentialsException e Pass in the exception that is thrown
     *
     * @return A responseentity object
     *
     * @docauthor Trelent
     */
    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<Object> handleApiRequestException(BadCredentialsException e){
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        ApiException apiException = new ApiException(e.getMessage(),httpStatus, ZonedDateTime.now());
        return new ResponseEntity<>(apiException, httpStatus);
    }

    /**
     * The handleApiRequestException function is a function that handles the AccessDeniedException.
     * It returns an ApiException object with the message, httpStatus, and ZonedDateTime.now().
     *
     *
     * @param AccessDeniedException e Get the message from the exception

     *
     * @return A responseentity with a body of type apiexception and the appropriate http status code
     *
     * @docauthor Trelent
     */
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