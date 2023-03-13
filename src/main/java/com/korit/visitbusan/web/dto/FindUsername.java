package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
/*******************************************
 *** 작성자 : 이성욱
 *  버전 : V0.1
 *  내용 :  회원 아이디 찾기 Dto
 *  작성일 : 2023.03.07
 *******************************************/
public class FindUsername {
    private String name;
    private String tellNumber;
}
