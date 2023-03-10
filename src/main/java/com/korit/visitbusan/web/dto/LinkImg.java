package com.korit.visitbusan.web.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 썸네일과 메인이미지 링크로 수정하기 위한 Dto
 *  작성일 : 2023.03.03
 *******************************************/
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LinkImg {
    @ApiModelProperty(name="link", value = "메인이미지, 썸네일 링크로 등록", example = "https://www.visitbusan.net/uploadImgs/files/cntnts/20191225163741459_ttiel")
    private String link;
}
