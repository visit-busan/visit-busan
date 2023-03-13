package com.korit.visitbusan.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  검색후 결과 값 저장할 Entity
 *  작성일 : 2023.03.09
 *******************************************/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchResult {
    @NotBlank
    @ApiModelProperty(name="tourId", value = "게시글Id값", example = "59", required = true)
    private int tourId;
    @NotBlank
    @ApiModelProperty(name="title", value = "게시글Title", example = "부산의 역사, 대한민국의 역사", required = true)
    private String title;
    @NotBlank
    @ApiModelProperty(name="subtitle", value = "게시글SubTitle", example = "박물관이 알려주는 부산의 역사이야기")
    private String subtitle;
    @NotBlank
    @ApiModelProperty(name="thumbnailImage", value = "게시글Thumbnail", example = "https://www.visitbusan.net/uploadImgs/files/cntnts/20191225162953256_thumbL")
    private String thumbnailImage;
    @NotBlank
    @ApiModelProperty(name="contents", value = "게시글Contents", example = "<p>‘부산’이라는 이름의 박물관.\n" +
            " 그만큼 부산을 대표하는 박물관이자 대한민국의 역사를 담고 있는 곳이다.\n" +
            " 1978년 11월에 개관한 ‘부산박물관’은 부산시")
    private String contents;
    @NotBlank
    @ApiModelProperty(name="viewCount", value = "조회수", example = "1")
    private int viewCount;
    @NotBlank
    @ApiModelProperty(name="commentCount", value = "리뷰수", example = "1")
    private int commentCount;
    @NotBlank
    @ApiModelProperty(name="likeCount", value = "좋아요수", example = "1")
    private int likeCount;

}

