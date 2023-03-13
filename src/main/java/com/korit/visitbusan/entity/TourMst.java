package com.korit.visitbusan.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 CRUD시 사용할 entity
 *  작성일 : 2023.03.06
 *******************************************/
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourMst {
    @ApiModelProperty(name="tourId", value = "게시글Id값", example = "59")
    private int tourId;
    @ApiModelProperty(name="categoryId", value = "카테고리Id값", example = "2")
    private int categoryId;
    @ApiModelProperty(name="userId", value = "작성자Id값", example = "4")
    private int userId;
    @ApiModelProperty(name="title", value = "게시글Title", example = "부산의 역사, 대한민국의 역사")
    private String title;
    @ApiModelProperty(name="subtitle", value = "게시글SubTitle", example = "박물관이 알려주는 부산의 역사이야기")
    private String subtitle;
    @ApiModelProperty(name="contents", value = "게시글Contents내용", example = "abc")
    private String contents;
    @ApiModelProperty(name="mainImage", value = "게시글MainImage주소", example = "https://www.visitbusan.net/uploadImgs/files/cntnts/20191225163741459_ttiel")
    private String mainImage;
    @ApiModelProperty(name="thumbnailImage", value = "게시글ThumbnailImage주소", example = "https://www.visitbusan.net/uploadImgs/files/cntnts/20191225163741459_thumbL")
    private String thumbnailImage;
    @ApiModelProperty(name="viewCount", value = "게시글조회수", example = "1")
    private int viewCount;
    @ApiModelProperty(name="lat", value = "게시글 장소의 위도", example = "35.1295700000")
    private String lat;
    @ApiModelProperty(name="lon", value = "게시글 장소의 경도", example = "129.0945100000")
    private String lon;
    @ApiModelProperty(name="createDate", value = "게시글생성일", example = "2023-02-24")
    private LocalDateTime createDate;
    @ApiModelProperty(name="tellNumber", value = "게시글 장소의 전화번호", example = "051-610-7111")
    private String tellNumber;
    @ApiModelProperty(name="homepageUrl", value = "게시글 장소의 홈페이지", example = "http://museum.busan.go.kr/busan")
    private String homepageUrl;
    @ApiModelProperty(name="holidayInfo", value = "게시글 장소의 휴무일", example = "매주 월요일, 1월 1일")
    private String holidayInfo;
    @ApiModelProperty(name="handicappedArea", value = "게시글 장소의 편의시설", example = "장애인 주차장, 장애인 화장실, 장애인전용 엘리베이터, 자동안내 모바일앱(수화영상안내), 한국어 음성가이드기, 휠체어 무료 대여, 휠체어 접근 가능, 안내견 동반 가능")
    private String handicappedArea;
    @ApiModelProperty(name="usageDayAndTime", value = "게시글 장소의 이용시간", example = "09:00~18:00")
    private String usageDayAndTime;
    @ApiModelProperty(name="usageAmount", value = "게시글 장소의 이용료", example = "무료")
    private String usageAmount;
    @ApiModelProperty(name="mainMenu", value = "게시글 장소의 메인메뉴", example = "없음")
    private String mainMenu;
    @ApiModelProperty(name="trafficInfo", value = "게시글 장소의 교통정보", example = "도시철도 2호선 대연역 1번 출구 도보 12분버스 134, 51, 68, 138, 138-1, 1006 시립박물관?부산문화회관 하차부산시티투어버스 : 부산역(레드라인) → 부산박물관 하차주차 박물관 내 주차장(무료)")
    private String trafficInfo;
    @ApiModelProperty(name="etcInfo", value = "게시글 장소의 기타정보", example = "없음")
    private String etcInfo;
    @ApiModelProperty(name="rating", value = "평점", example = "5")
    private String rating;
}
