package com.korit.visitbusan.repository;

import com.korit.visitbusan.entity.*;
import com.korit.visitbusan.web.dto.DeleteReviewDto;
import com.korit.visitbusan.web.dto.LikeReqDto;
import com.korit.visitbusan.web.dto.ReviewRespDto;
import com.korit.visitbusan.web.dto.TourReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 CRUD를 위한 Repository
 *  작성일 : 2023.03.03
 *******************************************/
@Mapper
public interface PostRepository {

    //게시글 Read ----------------------------------------------------
    public TourMst getTourIdByTourId(int tourId);
    public TourMst getPost(int tourId);
    public TourMst getPostByStringTourId(String tourId);

    //게시글 Create --------------------------------------------------
    public int savePost(TourReqDto tourReqDto);
    public int saveTourUsage(TourReqDto tourReqDto);

    //게시글 Delete --------------------------------------------------
    public int deletePost(int tourId);
    public int deleteTourUsage(int tourId);

    //게시글 Update --------------------------------------------------
    public int updateTourMst(TourReqDto tourReqDto);
    public int updateTourUsage(TourReqDto tourReqDto);

    //게시글 썸네일, 메인이미지 Create ----------------------------------
    public int saveThumbnailImg(String tourId, String thumbnailImg);
    public int saveMainImg(String tourId, String mainImg);

    //게시글 썸네일, 메인이미지 Read ------------------------------------
    public String getThumbnailByTourId(String tourId);
    public String getMainImgByTourId(String tourId);

    //게시글 조회수 Read ----------------------------------------------
    public int getPostViewCount(int tourId);

    //게시글 조회수 Create --------------------------------------------
    public int updateViewCount(int tourId);

    //리뷰 Create ----------------------------------------------------
    public int saveTourComment(CommentMst commentMst);
    public int saveCommentDtl(List<CommentDtl> commentDtls);

    //리뷰 Read ------------------------------------------------------
    public List<ReviewRespDto> getReviewList(int tourId);
    public int exitReviewCheckByCommentIdAndUserId(DeleteReviewDto deleteReviewDto);
    public List<String> getReviewImagePaths(int commentId);

    //리뷰 Delete ----------------------------------------------------
    public int deleteReview(int commentId);
    public int deleteReviewImages(int commentId);

    //카테고리 Get ----------------------------------------------------
    public List<CategoryMst> getCategoryList();

    //태그 Get -------------------------------------------------------
    public List<TourTag> getTourTagList(int categoryId);

    //게시글의 태그 Get -----------------------------------------------
    public List<Integer> getPostTag(int tourId);

    //태그 Create ----------------------------------------------------
    public int registerTagDtl(List<TagDtl> tagDtls);

    //태그 Delete ----------------------------------------------------
    public int deleteTagDtl(int tourId);

    //게시글 좋아요 개수 Get --------------------------------------------
    public int getLikeCount(int tourId);

    //게시글 좋아요 여부 Get --------------------------------------------
    public int isLike(LikeReqDto likeReqDto);

    //게시글 좋아요 Create ---------------------------------------------
    public int registerLike(LikeReqDto likeReqDto);

    //게시글 좋아요 Delete ---------------------------------------------
    public int deleteLike(LikeReqDto likeReqDto);
}
