package com.korit.visitbusan.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMst {

    @ApiModelProperty(hidden = true)
    private int userId;

    @NotBlank
    @ApiModelProperty(name = "username", value = "사용자 아이디", example = "abc123", required = true)
    private String username;

    @NotBlank
    @ApiModelProperty(name = "password", value = "사용자 비밀번호", example = "1q2w3e4r!", required = true)
    private String password;
    @NotBlank
    @ApiModelProperty(name = "repassword", value = "사용자 비밀번호 재입력", example = "1q2w3e4r!", required = true)
    private String repassword;

    @NotBlank
    @ApiModelProperty(name = "name", value = "사용자 이름", example = "홍길동", required = true)
    private String name;

    @ApiModelProperty(name = "gender", value = "사용자 성별", example = "1 or 2", required = false)
    private String gender;

    @NotBlank
    @ApiModelProperty(name = "birth", value = "사용자 생년월일", example = "970510", required = true)
    private String birth;

    @NotBlank
    @ApiModelProperty(name = "tellNumber", value = "사용자 전화번호", example = "01012345678", required = true)
    private String tellNumber;

    @NotBlank
    @Email
    @ApiModelProperty(name = "email", value = "사용자 이메일", example = "abc@gmail.com", required = true)
    private String email;
    @ApiModelProperty(name = "userLat", value = "사용자 위도", example = "35.100000", required = false)
    private double userLat;
    @ApiModelProperty(name = "userLng", value = "사용자 경도", example = "126.100000", required = false)
    private double userLng;

    @ApiModelProperty(name = "provider", value = "Oauth데이터 출처", example = "Google, Naver", required = false)
    private String provider;

    @ApiModelProperty(name = "userMarketing", value = "사용자 마케팅정보 동의 수신여부", example = "1 or 2", required = false)
    private int userMarketing;

    @ApiModelProperty(hidden = true)
    private LocalDateTime createDate;

    @ApiModelProperty(hidden = true)
    private LocalDateTime updateDate;
    @ApiModelProperty(hidden = true)
    private List<RoleDtl> roleDtl;
}
