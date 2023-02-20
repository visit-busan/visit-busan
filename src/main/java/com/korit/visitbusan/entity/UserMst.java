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

    private String name;

    private int gender;

    private String birth;

    private String tellNumber;

    private String email;

    private String provider;

    private List<RoleDtl> roleDtl;

    private LocalDateTime createDate;
    
    private LocalDateTime updateDate;
}
