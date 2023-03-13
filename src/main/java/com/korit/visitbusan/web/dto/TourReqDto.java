package com.korit.visitbusan.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.List;

/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 생성시 사용할 Dto
 *  작성일 : 2023.03.07
 *******************************************/
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourReqDto {
    @ApiModelProperty(hidden = true)
    private int tourId;
    @Min(1)
    @ApiModelProperty(name="categoryId", value = "카테고리 Id값", example = "2")
    private int categoryId;
    @Min(1)
    @ApiModelProperty(name="userId", value = "작성자 Id값", example = "6")
    private int userId;
    @NotBlank
    @ApiModelProperty(name="tourTitle", value = "게시글 Title", example = "게시글 Title")
    private String tourTitle;
    @ApiModelProperty(name="tourSubTitle", value = "게시글 SubTitle", example = "게시글 SubTitle")
    private String tourSubTitle;
    @ApiModelProperty(name="tourContents", value = "게시글 내용", example = "게시글 내용")
    private String tourContents;
    @ApiModelProperty(name="usageHomepage", value = "게시글 장소 홈페이지", example = "homePageUrl")
    private String usageHomepage;
    @ApiModelProperty(name="usageNumber", value = "게시글 장소 전화번호", example = "055-944-3333")
    private String usageNumber;
    @ApiModelProperty(name="usageOffDay", value = "게시글 장소 휴무일", example = "매주 월")
    private String usageOffDay;
    @ApiModelProperty(name="usageRuntime", value = "게시글 장소 이용시간", example = "09:00 ~ 18:00")
    private String usageRuntime;
    @ApiModelProperty(name="usageUsingFee", value = "게시글 장소 이용요금", example = "무료")
    private String usageUsingFee;
    @ApiModelProperty(name="usageMainMenu", value = "게시글 장소 메인메뉴", example = "없음")
    private String usageMainMenu;
    @ApiModelProperty(name="usageConvenient", value = "게시글 장소 편의시설", example = "장애인 주차구역 이용가능")
    private String usageConvenient;
    @ApiModelProperty(name="usageOther", value = "게시글 장소 기타정보", example = "없음")
    private String usageOther;
    @ApiModelProperty(name="usageTraffic", value = "게시글 장소 교통정보", example = "교통정보")
    private String usageTraffic;

}
