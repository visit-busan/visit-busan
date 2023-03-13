package com.korit.visitbusan.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 등록,수정 SummerNote에서 image태그에 들어갈 src주소값을 retrun하는 Dto
 *  작성일 : 2023.03.03
 *******************************************/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostImgRespDto {
    @ApiModelProperty(hidden = true)
    private String url;

}
