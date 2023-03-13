package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 썸네일과 메인이미지 링크로 수정하기 위한 Dto
 *  작성일 : 2023.03.03
 *******************************************/
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LinkImg {
    private String link;
}
