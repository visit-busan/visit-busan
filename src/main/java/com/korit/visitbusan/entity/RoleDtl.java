package com.korit.visitbusan.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
/*******************************************
 *** 작성자 : 정순동, 이성욱
 *  버전 : V0.1
 *  내용 :  RoleDtl 테이블 CRUD시 사용할 entity
 *  작성일 : 2023.03.06
 *******************************************/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleDtl {

    private int roleDtlId;

    private int userId;

    private int roleId;

    private RoleMst roleMst;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
