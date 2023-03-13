package com.korit.visitbusan.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  리뷰 이미지 등록시 사용할 entity
 *  작성일 : 2023.03.06
 *******************************************/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDtl {

    @ApiModelProperty(hidden = true)
    private int commentDtlId;
    @ApiModelProperty(name="commentId", value = "리뷰Id", example = "1")
    private int commentId;
    @ApiModelProperty(name="saveName", value = "저장된 이미지 이름", example = "abc.jpg")
    private String saveName;
    @ApiModelProperty(name="originName", value = "원래 이미지 이름", example = "abc.jpg")
    private String originName;
}
