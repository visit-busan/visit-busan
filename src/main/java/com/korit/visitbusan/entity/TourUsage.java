package com.korit.visitbusan.entity;


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
