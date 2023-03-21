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
public class AdminTourMst {
    @ApiModelProperty(hidden = true)
    private int tourId;

    @ApiModelProperty(value = "카테고리 이름", example = "도보여행")
    private String categoryName;

    @ApiModelProperty(value = "관광지 타이틀", example = "이야기로 피어난 어제의...")
    private String title;

    @ApiModelProperty(value = "작성자 ID", example = "tester")
    private String username;

    @ApiModelProperty(value= "생성일", example = "2023-02-28")
    private LocalDateTime createDate;

    @ApiModelProperty(value ="수정일", example = "2023-02-28")
    private LocalDateTime updateDate;
}
