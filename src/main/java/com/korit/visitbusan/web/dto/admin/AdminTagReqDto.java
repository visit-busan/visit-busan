package com.korit.visitbusan.web.dto.admin;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
public class AdminTagReqDto {

    @ApiModelProperty(value = "관광지 태그 ID", example = "1")
    private int tagId;

    @ApiModelProperty(value = "카테고리명", example = "명소", required = true)
    @NotBlank
    private String categoryName;

    @ApiModelProperty(value = "태그명", example = "자연")
    @NotBlank
    private String tagName;

    @ApiModelProperty(value = "등록자", example = "admin")
    private String registrant;

    @ApiModelProperty(value = "등록일", example = "2023-03-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd", timezone = "Asia/Seoul")
    private LocalDate createDate;

    @ApiModelProperty(value = "수정일", example = "2023-03-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-mm-dd", timezone = "Asia/Seoul")
    private LocalDate updateDate;
}
