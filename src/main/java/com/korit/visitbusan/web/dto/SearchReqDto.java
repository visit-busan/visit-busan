package com.korit.visitbusan.web.dto;

import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(name="categoryId", value = "카테고리Id", example = "2")
    private int categoryId;
    @ApiModelProperty(name="order", value = "정렬순서", example = "view")
    private String order;
    @ApiModelProperty(name="searchValue", value = "검색값", example = "초량이")
    private String searchValue;
    @ApiModelProperty(name="tagName", value = "태그이름", example = "자연")
    private String tagName;
    @ApiModelProperty(name="page", value = "페이지", example = "1")
    private int page;
    @ApiModelProperty(name="index", value = "(page - 1) x 8", example = "0")
    private int index;
    @ApiModelProperty(hidden = true)
    public void setIndex() {
        index = (page - 1) * 8;
    }
}
