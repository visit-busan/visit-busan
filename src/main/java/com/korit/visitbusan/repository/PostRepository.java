package com.korit.visitbusan.repository;

import com.korit.visitbusan.entity.TourComment;
import com.korit.visitbusan.entity.TourMst;
import com.korit.visitbusan.entity.TourRating;
import com.korit.visitbusan.web.dto.ReviewReqDto;
import com.korit.visitbusan.web.dto.TourReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostRepository {

    public int savePost(TourReqDto tourReqDto);

    public int saveThumbnailImg(String tourId, String thumbnailImg);
    public int saveMainImg(String tourId, String mainImg);

    public int saveTourRating(TourRating tourRating);
    public int saveTourComment(TourComment tourComment);

    public TourMst getPost(int tourId);
}
