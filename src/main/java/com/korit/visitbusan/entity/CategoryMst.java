package com.korit.visitbusan.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryMst {

    private int categoryId;

    private int userId;

    private String categoryName;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;
}
