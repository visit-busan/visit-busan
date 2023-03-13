package com.korit.visitbusan.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  리뷰 조회 실패시 사용할 Exception
 *  작성일 : 2023.03.07
 *******************************************/
@Getter
@AllArgsConstructor
public class CustomReviewException extends RuntimeException {
    private Map<String, String> errorMap;
}
