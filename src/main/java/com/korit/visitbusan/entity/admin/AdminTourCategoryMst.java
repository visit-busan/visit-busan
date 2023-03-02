package com.korit.visitbusan.entity.admin;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminTourCategoryMst {


    @ApiModelProperty(hidden = true)
    private int categoryId;

    @ApiModelProperty(value = "등록자 ID", example = "admin")
    private int username;

    @ApiModelProperty(value = "카테고리 이름", example = "도보여행")
    private String categoryName;

    @ApiModelProperty(value= "생성일", example = "2023-02-28")
    private LocalDateTime createDate;

    @ApiModelProperty(value ="수정일", example = "2023-02-28")
    private LocalDateTime updateDate;
}
