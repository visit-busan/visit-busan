package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  공통응답 DTO
 *  작성일 : 2023.03.03
 *******************************************/
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CMRespDto<T> {

    private int code;
    private String message;
    private T data;

}
