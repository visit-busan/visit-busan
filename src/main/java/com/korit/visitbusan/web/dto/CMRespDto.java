package com.korit.visitbusan.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

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
