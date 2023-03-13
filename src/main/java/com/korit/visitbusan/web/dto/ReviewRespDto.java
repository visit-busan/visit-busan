package com.korit.visitbusan.web.dto;

import com.korit.visitbusan.entity.CommentDtl;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  comment_mst + comment_dtl 정보 Response할 Dto
 *  작성일 : 2023.03.06
 *******************************************/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRespDto {
    @ApiModelProperty(name="commentId", value = "리뷰 Id값", example = "1")
    private int commentId;
    @ApiModelProperty(name="userId", value = "리뷰 작성자Id값", example = "6")
    private int userId;
    @ApiModelProperty(name="tourId", value = "게시글 Id값", example = "59")
    private int tourId;
    @ApiModelProperty(name="visit", value = "방문여부", example = "2")
    private int visit;
    @ApiModelProperty(name="reviewComment", value = "리뷰 내용", example = "재밌었어요.")
    private String reviewComment;
    @ApiModelProperty(name="rating", value = "평점", example = "5")
    private int rating;
    @ApiModelProperty(name="createDate", value = "리뷰 생성일", example = "2023-03-10")
    private LocalDate createDate;
    @ApiModelProperty(name="username", value = "리뷰 작성자 이름", example = "sun")
    private String username;
    @ApiModelProperty(name="commentDtl", value = "리뷰 이미지List", example = "없음")
    private List<CommentDtl> commentDtl;
}
