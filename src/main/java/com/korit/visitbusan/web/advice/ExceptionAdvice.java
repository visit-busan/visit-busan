package com.korit.visitbusan.web.advice;

import com.korit.visitbusan.exception.CustomUnknownPostException;
import com.korit.visitbusan.exception.CustomValidationException;
import com.korit.visitbusan.web.dto.CMRespDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<?> validationError(CustomValidationException e) {
        return ResponseEntity
                .badRequest()
                .body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(), "Validation Error", e.getErrorMap()));
    }
    @ExceptionHandler(CustomUnknownPostException.class)
    public ResponseEntity<?> unknownPostError(CustomUnknownPostException e) {
        return ResponseEntity
                .badRequest()
                .body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(), "UnknownPost Error", e.getErrorMap()));
    }
}
