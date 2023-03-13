package com.korit.visitbusan.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 좋아요 CRUD용 Dto
 *  작성일 : 2023.03.03
 *******************************************/

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LikeReqDto {
    @Min(1)
    @ApiModelProperty(name="userId", value = "좋아요 누른이Id값", example = "6", required = true)
    private int userId;
    @Min(1)
    @ApiModelProperty(name="tourId", value = "게시글 Id값", example = "59", required = true)
    private int tourId;
}
