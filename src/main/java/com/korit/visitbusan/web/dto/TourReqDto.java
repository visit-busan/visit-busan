package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourReqDto {
    private int tourId;
    private String tourCategory;
    private String userId;
    private String tourTitle;
    private String tourSubTitle;
    private String tourContents;
    private String tourTrafficInformation;
    private String tourHandicappedArea;
    private String usageHomepage;
    private String usageNumber;
    private String usageRunDay;
    private String usageOffDay;
    private String usageRuntime;
    private String usageUsingFee;
    private String usageMainMenu;
    private String usageConvenient;
    private String usageOther;
    private String usageTraffic;

}
