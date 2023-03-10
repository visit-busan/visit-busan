package com.korit.visitbusan.web.advice;

import com.korit.visitbusan.exception.CustomValidationException;
import com.korit.visitbusan.web.dto.CMRespDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    public ResponseEntity<?> validationError(CustomValidationException e) {
        return ResponseEntity.badRequest().body(new CMRespDto<>(HttpStatus.BAD_REQUEST.value(), "validation error", e.getErrorMap()));
    }

}
