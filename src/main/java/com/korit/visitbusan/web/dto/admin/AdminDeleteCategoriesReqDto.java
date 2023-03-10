package com.korit.visitbusan.web.dto.admin;

import lombok.Data;

import java.util.List;
@Data
public class AdminDeleteCategoriesReqDto {
    private List<Integer> categoryIds;
}
