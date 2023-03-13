package com.korit.visitbusan.web.dto.admin;

import lombok.Data;

import java.util.List;

@Data
public class AdminDeleteToursReqDto {
    private List<Integer> tourIds;
}
