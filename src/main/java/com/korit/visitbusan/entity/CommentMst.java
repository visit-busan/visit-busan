package com.korit.visitbusan.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private int commentId;

    private int userId;

    private int tourId;

    private int visit;

    private String reviewComment;

    private int rating;

    private LocalDateTime createDate;
}
