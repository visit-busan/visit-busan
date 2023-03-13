package com.korit.visitbusan.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
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
public class TagDtl {
    @NotBlank
    @ApiModelProperty(name="tourId", value = "게시글Id값", example = "59", required = true)
    private int tourId;
    @NotBlank
    @ApiModelProperty(name="tagId", value = "태그Id값", example = "1", required = true)
    private int tagId;

}
