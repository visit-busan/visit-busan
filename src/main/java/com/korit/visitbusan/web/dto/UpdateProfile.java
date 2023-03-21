package com.korit.visitbusan.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProfile {

    private int userId;
    private String name;
    private String tellNumber;
    private String email;
}
