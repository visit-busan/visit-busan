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
 *  내용 :  RoleMst 테이블 CRUD시 사용할 entity
 *  작성일 : 2023.03.06
 *******************************************/
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleMst {
    @ApiModelProperty(name = "roleId", value = "사용자 권한", example = "1 or 2", required = false)
    private int roleId;
    @ApiModelProperty(name = "roleName", value = "사용자 권한 이름", example = "admin", required = false)
    private String roleName;
    @ApiModelProperty(hidden = true)
    private LocalDateTime createDate;
    @ApiModelProperty(hidden = true)
    private LocalDateTime updateDate;
}
