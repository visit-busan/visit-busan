package com.korit.visitbusan.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  tag 정보들을 가져올 Entity
 *  작성일 : 2023.03.09
 *******************************************/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TourTag {
    @ApiModelProperty(hidden = true)
    private int tagId;
    @ApiModelProperty(name="tagName", value = "태그이름", example = "자연")
    private String tagName;
}
