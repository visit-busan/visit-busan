package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    private int userId;
    private int reviewId;
}
