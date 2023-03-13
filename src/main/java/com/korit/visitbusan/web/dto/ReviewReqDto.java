package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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

    private int reviewId;
    private int userId;
    private int rating;
    private int visitStatus;
    private String reviewContent;

}
