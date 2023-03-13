package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private int tourId;
    private int categoryId;
    @NotBlank
    private int userId;
    private String tourTitle;
    private String tourSubTitle;
    private String tourContents;
    private String usageHomepage;
    private String usageNumber;
    private String usageOffDay;
    private String usageRuntime;
    private String usageUsingFee;
    private String usageMainMenu;
    private String usageConvenient;
    private String usageOther;
    private String usageTraffic;

}
