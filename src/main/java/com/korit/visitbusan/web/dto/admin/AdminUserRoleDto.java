package com.korit.visitbusan.web.dto.admin;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*******************************************
 *** 작성자 : 홍성욱
 *  버전 : V0.1
 *  내용 :  관리자 페이지 사용자 관리 페이지를 위한 DTO
 *  작성일 : 2023.03.02
 *******************************************/

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminUserRoleDto {

    private int userId;
    private int roleId;

    @ApiModelProperty(value = "사용자 아이디 ")
    private String username;

    @ApiModelProperty(value = "권한 이름")
    private String roleName;

    @ApiModelProperty(value = "사용자 이름")
    private String name;

    @ApiModelProperty(value = "사용자 아이디 or 권한 이름")
    private String searchValue;

    @ApiModelProperty(value = "정렬", example = "권한 이름")
    private String order;

    @ApiModelProperty(value = "조회전체 = N, 조회제한 = Y")
    private String limit;

    @ApiModelProperty(value = "페이지번호", example = "1")
    private int page;

    @ApiModelProperty(value = "표시할 개시글 개수", example = "20")
    private int count;

    @ApiModelProperty(hidden = true)
    private int index;

    public void setIndex() {
        index = (page -1) * count;
    }
}
