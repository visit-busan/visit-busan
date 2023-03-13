package com.korit.visitbusan.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  리뷰 등록시 사용할 entity
 *  작성일 : 2023.03.06
 *******************************************/
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CommentMst {

    @ApiModelProperty(hidden = true)
    private int commentId;
    @NotBlank
    @ApiModelProperty(name="userId", value = "사용자Id값", example = "1", required = true)
    private int userId;
    @NotBlank
    @ApiModelProperty(name="tourId", value = "게시글Id값", example = "59", required = true)
    private int tourId;
    @NotBlank
    @ApiModelProperty(name="visit", value = "방문여부", example = "2", required = true)
    private int visit;
    @NotBlank
    @ApiModelProperty(name="reviewComment", value = "리뷰내용", example = "최고였습니다.", required = true)
    private String reviewComment;
    @NotBlank
    @ApiModelProperty(name="rating", value = "평점", example = "5", required = true)
    private int rating;
    @ApiModelProperty(hidden = true)
    private LocalDateTime createDate;
}
