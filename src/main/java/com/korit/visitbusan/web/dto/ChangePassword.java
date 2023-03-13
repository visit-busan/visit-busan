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
 *  내용 :  회원 비밀번호 변경 Dto
 *  작성일 : 2023.03.07
 *******************************************/
public class ChangePassword {
    private String username;
    private String name;
    private String tellNumber;
    private String password;
}
