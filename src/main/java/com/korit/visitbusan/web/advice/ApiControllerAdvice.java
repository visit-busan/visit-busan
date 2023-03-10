package com.korit.visitbusan.web.advice;

import com.korit.visitbusan.exception.CustomRegisterException;
import com.korit.visitbusan.exception.CustomValidationException;
import com.korit.visitbusan.web.dto.CMRespDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiControllerAdvice {

    @ExceptionHandler(CustomRegisterException.class)
    public ResponseEntity<?> duplicateError(CustomRegisterException c) {
        return ResponseEntity
                .badRequest()
                .body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(), c.getMessage(), c.getErrorMap()));
    }

}
