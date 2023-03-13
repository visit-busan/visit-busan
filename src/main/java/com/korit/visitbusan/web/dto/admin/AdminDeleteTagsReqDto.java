package com.korit.visitbusan.web.dto.admin;

import lombok.Data;

import java.util.List;

@Data
public class AdminDeleteTagsReqDto {
    private List<Integer> tagIds;

}
