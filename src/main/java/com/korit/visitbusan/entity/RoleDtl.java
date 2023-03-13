package com.korit.visitbusan.entity;

import io.swagger.annotations.ApiModelProperty;
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

    @ApiModelProperty(hidden = true)
    private int roleDtlId;

    @ApiModelProperty(name = "username", value = "사용자 아이디", example = "abc123", required = true)
    private int userId;

    @ApiModelProperty(name = "roleId", value = "권한", example = "1", required = true)
    private int roleId;

    @ApiModelProperty(hidden = true)
    private RoleMst roleMst;

    @ApiModelProperty(hidden = true)
    private LocalDateTime createDate;
    @ApiModelProperty(hidden = true)
    private LocalDateTime updateDate;
}
