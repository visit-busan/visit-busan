package com.korit.visitbusan.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourMst {

    private int tourId;

    private String tourCategory;

    private String tourTitle;

    private String tourSubTitle;

    private String tourContents;

    private String tourTrafficInformation;

    private String tourHandicappedArea;

}
