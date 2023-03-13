package com.korit.visitbusan.exception;

import lombok.Getter;

import java.util.Map;
/*******************************************
 *** 작성자 : 이성욱
 *  버전 : V0.1
 *  내용 :  회원가입 조회 실패시 사용할 Exception
 *  작성일 : 2023.03.07
 *******************************************/
public class CustomRegisterException extends RuntimeException {
    @Getter
    private Map<String, String> errorMap;

    public CustomRegisterException(String message, Map<String, String> errorMap) {
        super(message);
        this.errorMap = errorMap;
    }

}
