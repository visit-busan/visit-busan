package com.korit.visitbusan.web.dto.admin;

import com.korit.visitbusan.entity.RoleDtl;
import com.korit.visitbusan.entity.RoleMst;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/*******************************************
 *** 작성자 : 홍성욱
 *  버전 : V0.1
 *  내용 :  관리자 페이지 사용자 관리 페이지를 위한 DTO
 *  작성일 : 2023.03.12
 *******************************************/

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUserDto {

    private int userId;
    private int roleId;
    private String name;
    private String roleName;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private String selectValue;
}
