package com.korit.visitbusan.web.dto.admin;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AdminCategoryReqDto {

    @ApiModelProperty(value = "카테고리 ID", example = "1")
    private int categoryId;

    @ApiModelProperty(value = "카테고리명", example = "명소", required = true)
    @NotBlank
    private String categoryName;

    @ApiModelProperty(value = "userId", example = "1")
    private int userId;

    @ApiModelProperty(value = "등록일", example = "2023-03-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createDate;

    @ApiModelProperty(value = "수정일", example = "2023-03-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime updateDate;
}
