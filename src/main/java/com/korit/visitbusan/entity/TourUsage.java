package com.korit.visitbusan.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourUsage {

    private int usageId;

    private int tourId;

    private String tellNumber;

    private String homepageUrl;

    private String holidayInfo;

    private String handicappedArea;

    private String usageDayAndTime;

    private String usageAmount;

    private String rprsntbMenu;

    private String transportInfo;

    private String etcInfo;

}
