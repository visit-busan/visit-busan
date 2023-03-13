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
 *  내용 :  리뷰 등록시 사용할 RequestDto
 *  작성일 : 2023.03.07
 *******************************************/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReqDto {
    @ApiModelProperty(hidden = true)
    private int reviewId;
    @Min(1)
    @ApiModelProperty(name="userId", value = "리뷰 작성자Id값", example = "6", required = true)
    private int userId;
    @Min(1) @Max(5)
    @ApiModelProperty(name="rating", value = "평점", example = "5", required = true)
    private int rating;
    @Min(1) @Max(2)
    @ApiModelProperty(name="visitStatus", value = "방문여부", example = "1", required = true)
    private int visitStatus;
    @NotBlank
    @ApiModelProperty(name="reviewContent", value = "리뷰 내용", example = "재밌었어요.", required = true)
    private String reviewContent;

}
