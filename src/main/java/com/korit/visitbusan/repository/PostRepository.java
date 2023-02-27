package com.korit.visitbusan.repository;

import com.korit.visitbusan.web.dto.TourReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostRepository {

    public int savePost(TourReqDto tourReqDto);

    public int saveThumbnailImg(String tourId, String thumbnailImg);
    public int saveMainImg(String tourId, String mainImg);
}
