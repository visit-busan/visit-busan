package com.korit.visitbusan.entity;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  TourUsage테이블 CRUD시 사용할 entity
 *  작성일 : 2023.03.06
 *******************************************/
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourUsage {
    @ApiModelProperty(hidden = true)
    private int usageId;
    @ApiModelProperty(name="tourId", value = "게시글Id값", example = "59")
    private int tourId;
    @ApiModelProperty(name="tellNumber", value = "게시글 장소의 전화번호", example = "051-610-7111")
    private String tellNumber;
    @ApiModelProperty(name="tagName", value = "태그이름", example = "자연")
    private String homepageUrl;
    @ApiModelProperty(name="tagName", value = "태그이름", example = "자연")
    private String holidayInfo;

    private String handicappedArea;

    private String usageDayAndTime;

    private String usageAmount;

    private String rprsntvMenu;

    private String transportInfo;

    private String etcInfo;

}
