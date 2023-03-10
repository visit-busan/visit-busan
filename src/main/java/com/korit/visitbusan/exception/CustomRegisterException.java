package com.korit.visitbusan.exception;

import lombok.Getter;

import java.util.Map;

public class CustomRegisterException extends RuntimeException {
    @Getter
    private Map<String, String> errorMap;

    public CustomRegisterException(String message, Map<String, String> errorMap) {
        super(message);
        this.errorMap = errorMap;
    }

}
