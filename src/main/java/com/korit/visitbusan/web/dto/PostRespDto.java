package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 주요 정보들 ResponseDto
 *  작성일 : 2023.03.07
 *******************************************/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostRespDto {
    private int tourId;
    private int categoryId;
    private int userId;
    private String title;
    private String subtitle;
    private String contents;
    private String mainImage;
    private String thumbnailImage;
    private int viewCount;
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
    private String rating;
}
