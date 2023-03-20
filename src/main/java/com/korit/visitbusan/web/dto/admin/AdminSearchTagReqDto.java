package com.korit.visitbusan.web.dto.admin;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AdminSearchTagReqDto {

    @ApiModelProperty(value = "검색값", example = "도보")
    private String searchValue;

    @ApiModelProperty(value = "관광카테고리", example = "명소")
    private String categoryName;

    @NotBlank
    @ApiModelProperty(value = "조회 전체 = N, 조회 제한 = Y", required = true)
    private String limit;

    @ApiModelProperty(value = "페이지 번호", example = "1")
    private int page;

    @ApiModelProperty(value = "페이지당 출력 카테고리 개수", example = "5")
    private int count;

    @ApiModelProperty(hidden = true)
    private int index;

    public void setIndex() {
        index = (page - 1) * count;
    }
}
