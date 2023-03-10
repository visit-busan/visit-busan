package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  태그 등록을 위한 Dto
 *  작성일 : 2023.03.09
 *******************************************/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagReqDto {
    private List<Integer> tagList;
}
