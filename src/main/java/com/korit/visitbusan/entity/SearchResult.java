package com.korit.visitbusan.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    private int tourId;
    private String title;
    private String subtitle;
    private String thumbnailImage;
    private String contents;
    private int viewCount;
    private int commentCount;
    private int likeCount;

}

