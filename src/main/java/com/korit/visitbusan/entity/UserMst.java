package com.korit.visitbusan.entity;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMst {

    private int userId;

    private String username;

    private String password;
    private String repassword;

    private String name;

    private String gender;

    private String birth;

    private String tellNumber;

    private String email;

    private double userLat;

    private double userLng;

    private String provider;

    private int userMarketing;

    private List<RoleDtl> roleDtl;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;
}
