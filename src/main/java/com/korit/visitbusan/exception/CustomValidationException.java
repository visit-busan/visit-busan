package com.korit.visitbusan.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public class CustomValidationException extends RuntimeException {
    private Map<String, String> errorMap;
}
