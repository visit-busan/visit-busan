package com.korit.visitbusan.entity.admin;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AdminCategoryView {

    @ApiModelProperty(value="카테고리 순번", example="1")
    private int categoryId;
    @ApiModelProperty(value="카테고리 이름", example="도보여행")
    private String categoryName;
}
