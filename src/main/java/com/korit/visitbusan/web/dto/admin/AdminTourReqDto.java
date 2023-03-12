package com.korit.visitbusan.web.dto.admin;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
public class AdminTourReqDto {

    @ApiModelProperty(value = "관광지 ID", example = "1")
    private int tourId;

    @ApiModelProperty(value = "카테고리명", example = "명소", required = true)
    @NotBlank
    private String categoryName;

    @ApiModelProperty(value = "관광지 타이틀", example = "어느날 어디선가...")
    @NotBlank
    private String title;

    @ApiModelProperty(value = "userId", example = "1")
    private int userId;

    @ApiModelProperty(value = "등록일", example = "2023-03-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd", timezone = "Asia/Seoul")
    private LocalDate createDate;

    @ApiModelProperty(value = "수정일", example = "2023-03-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd", timezone = "Asia/Seoul")
    private LocalDate updateDate;
}
