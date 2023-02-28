package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostRespDto {
    private int tourId;
    private int categoryId;
    private String title;
    private String subtitle;
    private String contents;
    private String mainImage;
    private String thumbnailImage;
    private String lat;
    private String lon;
    private LocalDateTime createDate;
    private String tellNumber;
    private String homepageUrl;
    private String holidayInfo;
    private String handicappedArea;
    private String usageDayAndTime;
    private String usageAmount;
    private String mainMenu;
    private String trafficInfo;
    private String etcInfo;
}
