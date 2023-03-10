package com.korit.visitbusan.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  리뷰 이미지 등록시 사용할 entity
 *  작성일 : 2023.03.06
 *******************************************/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDtl {
    private int commentDtlId;
    private int commentId;
    private String saveName;
    private String originName;
}
