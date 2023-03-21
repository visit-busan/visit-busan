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
public class AdminTagMst {


    @ApiModelProperty(hidden = true)
    private int tagId;

    @ApiModelProperty(value = "카테고리 이름", example = "도보여행")
    private String categoryName;

    @ApiModelProperty(value = "카테고리 Id", example = "1")
    private int categoryId;

    @ApiModelProperty(value = "태그명", example = "자연")
    private String tagName;

    @ApiModelProperty(value = "등록자 ID", example = "admin")
    private String username;

    @ApiModelProperty(value= "생성일", example = "2023-02-28")
    private LocalDateTime createDate;

    @ApiModelProperty(value ="수정일", example = "2023-02-28")
    private LocalDateTime updateDate;
}
