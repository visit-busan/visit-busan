package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  검색 조건 설정하는 Dto
 *  작성일 : 2023.03.09
 *******************************************/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchReqDto {
    private int categoryId;
    private String order;
    private String searchValue;
    private String tagName;
    private int page;
    private int index;
    public void setIndex() {
        index = (page - 1) * 8;
    }
}
