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
 *  내용 :  리뷰 삭제용 Dto
 *  작성일 : 2023.03.07
 *******************************************/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeleteReviewDto {
    @Min(1)
    @ApiModelProperty(name="userId", value = "리뷰 작성자Id값", example = "4", required = true)
    private int userId;
    @Min(1)
    @ApiModelProperty(name="reviewId", value = "리뷰 Id값", example = "1", required = true)
    private int reviewId;
}
