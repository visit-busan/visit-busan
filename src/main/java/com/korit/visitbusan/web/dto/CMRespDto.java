package com.korit.visitbusan.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;
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

    @ApiModelProperty(value = "http status code", example = "200")
    private int code;
    @ApiModelProperty(value = "응답 메시지", example = "Successfully")
    private String message;
    private T data;

}
