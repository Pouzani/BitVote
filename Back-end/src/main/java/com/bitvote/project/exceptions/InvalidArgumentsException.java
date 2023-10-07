package com.bitvote.project.exceptions;

import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

public record InvalidArgumentsException(Map<String,String> messages, HttpStatus httpStatus, ZonedDateTime zonedDateTime) {
    @Override
    public String toString() {
        return "InvalidArgumentsException{" +
                "messages='" + messages + '\'' +
                ", httpStatus=" + httpStatus +
                ", zonedDateTime=" + zonedDateTime +
                '}';
    }
}
