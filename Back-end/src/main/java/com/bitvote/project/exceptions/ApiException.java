package com.bitvote.project.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import java.time.ZonedDateTime;


public record ApiException(String message, HttpStatus httpStatus, ZonedDateTime zonedDateTime) {
    @Override
    public String toString() {
        return "UsersApiException{" +
                "message='" + message + '\'' +
                ", httpStatus=" + httpStatus +
                ", zonedDateTime=" + zonedDateTime +
                '}';
    }
}
