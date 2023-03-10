package com.korit.visitbusan.web.dto;

import com.korit.visitbusan.entity.CommentDtl;
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

    private int commentId;
    private int userId;
    private int tourId;
    private int visit;
    private String reviewComment;
    private int rating;
    private LocalDate createDate;
    private String username;
    private List<CommentDtl> commentDtl;
}
