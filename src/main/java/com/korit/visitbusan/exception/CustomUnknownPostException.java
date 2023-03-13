package com.korit.visitbusan.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 조회 실패시 사용할 exception
 *  작성일 : 2023.03.03
 *******************************************/
@Getter
@AllArgsConstructor
public class CustomUnknownPostException extends RuntimeException {
    private Map<String, String> errorMap;
}
