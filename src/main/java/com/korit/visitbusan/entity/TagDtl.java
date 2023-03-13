package com.korit.visitbusan.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  tag정보들을 가져올 Entity
 *  작성일 : 2023.03.09
 *******************************************/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagDtl {

    private int tourId;

    private int tagId;

}
