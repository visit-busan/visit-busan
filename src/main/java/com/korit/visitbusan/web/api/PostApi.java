package com.korit.visitbusan.web.api;

import com.korit.visitbusan.aop.annotation.ParamsAspect;
import com.korit.visitbusan.aop.annotation.ValidAspect;
import com.korit.visitbusan.service.PostService;
import com.korit.visitbusan.web.dto.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 관련 RestController
 *  작성일 : 2023.03.03
 *******************************************/
@Api(tags = {"게시글,리뷰,평점관련 API"})
@RestController
@RequiredArgsConstructor
@Api(tags = {"게시글,리뷰,평점관련 API"})
public class PostApi {

    private final PostService postService;

    //SummerNote 이미지파일 Create --------------------------------------------------
    @ApiOperation(value = "썸머노트 게시글 사진 저장 후 콜백함수에 사용할 Link 리턴", notes = "썸머노트 관련 Api")
    @PostMapping("/uploadSummernoteImageFile")
    public ResponseEntity<CMRespDto<PostImgRespDto>> uploadSummernoteImageFile(@RequestPart List<MultipartFile> file) {

        List<String> pathList = postService.registerPostImg(file);

        PostImgRespDto postImgRespDto = PostImgRespDto.builder().url(pathList.get(0)).build();
        System.out.println(postImgRespDto);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", postImgRespDto));
    }

    //게시글 Read ------------------------------------------------------------------
    @ApiOperation(value = "getTour", notes = "tourId로 게시글 가져오기")
    @GetMapping("/api/post/{tourId}")
    public ResponseEntity<CMRespDto<?>> getPostByTourId(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getPostByTourId(tourId)));
    }

    //게시글 Create ----------------------------------------------------------------
    @ApiOperation(value = "registerTour", notes = "게시글 생성하기")
    @ValidAspect
    @PostMapping("api/post/register")
    public ResponseEntity<?> registerPost(@RequestBody @Valid TourReqDto tourReqDto, BindingResult bindingResult) {
        System.out.println(tourReqDto);

        postService.registerTourMst(tourReqDto);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", tourReqDto.getTourId()));
    }

    //게시글 Delete ----------------------------------------------------------------
    @ApiOperation(value = "deleteTour", notes = "tourId로 게시글 삭제하기")
    @DeleteMapping("/api/post/{tourId}")
    public ResponseEntity<?> deletePost(@PathVariable int tourId) {
        String ti = "" + tourId;
        postService.deleteThumbnail(ti);
        postService.deleteMainImg(ti);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.deletePost(tourId)));
    }

    //게시글 썸네일 Create ----------------------------------------------------------
    @ApiOperation(value = "registerThumbnail", notes = "thumbnailImage 파일로 저장")
    @PostMapping("/api/post/register/{tourId}/thumbnail")
    public ResponseEntity<CMRespDto<?>> uploadThumbnailFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.registerThumbnailImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    @ApiOperation(value = "registerThumbnailWithLink", notes = "thumbnailImage 링크로 저장")
    @PostMapping("/api/post/register/{tourId}/thumbnail/link")
    public ResponseEntity<CMRespDto<?>> registerThumbnailFileWithLink(@PathVariable String tourId, @RequestBody LinkImg linkImg) {
        postService.registerThumbnailImgWithLink(tourId, linkImg.getLink());

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    //게시글 메인이미지 Create -------------------------------------------------------
    @ApiOperation(value = "registerMainImage", notes = "mainImage 파일로 저장")
    @PostMapping("/api/post/register/{tourId}/mainimg")
    public ResponseEntity<CMRespDto<?>> uploadMainImageFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.registerMainImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    @ApiOperation(value = "registerMainImage", notes = "mainImage 링크로 저장")
    @PostMapping("/api/post/register/{tourId}/mainimg/link")
    public ResponseEntity<CMRespDto<?>> registerMainImageFileWithLink(@PathVariable String tourId, @RequestBody LinkImg linkImg) {
        postService.registerMainImgWithLink(tourId, linkImg.getLink());

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    //게시글 Update ----------------------------------------------------------------
    @ApiOperation(value = "updateTour", notes = "게시글 업데이트")
    @ValidAspect
    @ParamsAspect
    @PutMapping("/api/post/{tourId}")
    public ResponseEntity<CMRespDto<?>> updatePost(@PathVariable int tourId, @RequestBody @Valid TourReqDto tourReqDto, BindingResult bindingResult) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.updatePost(tourReqDto)));
    }

    //게시글 썸네일 Update ----------------------------------------------------------
    @ApiOperation(value = "updateThumbnailImage", notes = "ThumbnailImage 삭제후 파일로 저장")
    @PostMapping("/api/post/modify/{tourId}/thumbnail")
    public ResponseEntity<CMRespDto<?>> modifyThumbnailFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.deleteThumbnail(tourId);
        postService.registerThumbnailImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img modified", true));
    }

    @ApiOperation(value = "updateThumbnailImageWithLink", notes = "ThumbnailImage 삭제후 링크로 저장")
    @PostMapping("/api/post/modify/{tourId}/thumbnail/link")
    public ResponseEntity<CMRespDto<?>> modifyThumbnailFileWithLink(@PathVariable String tourId, @RequestBody LinkImg linkImg) {
        postService.deleteThumbnail(tourId);
        postService.registerThumbnailImgWithLink(tourId, linkImg.getLink());

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img modified", true));
    }

    //게시글 메인이미지 Update ------------------------------------------------------
    @ApiOperation(value = "updateMainImage", notes = "mainImage 삭제후 파일로 저장")
    @PostMapping("/api/post/modify/{tourId}/mainimg")
    public ResponseEntity<CMRespDto<?>> modifyMainImageFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.deleteMainImg(tourId);
        postService.registerMainImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img modified", true));
    }

    @ApiOperation(value = "updateMainImageWithLink", notes = "mainImage 삭제후 링크로 저장")
    @PostMapping("/api/post/modify/{tourId}/mainimg/link")
    public ResponseEntity<CMRespDto<?>> modifyMainImageFileWithLink(@PathVariable String tourId, @RequestBody LinkImg linkImg) {
        postService.deleteMainImg(tourId);
        postService.registerMainImgWithLink(tourId, linkImg.getLink());

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img modified", true));
    }

    //게시글 조회수 Update ---------------------------------------------------------
    @ApiOperation(value = "updateViewCount", notes = "viewCount ++")
    @PutMapping("/api/post/{tourId}/view")
    public ResponseEntity<CMRespDto<?>> createViewCount(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.updateViewCount(tourId)));
    }

    //리뷰 Read -------------------------------------------------------------------
    @ApiOperation(value = "getReviews", notes = "게시글 리뷰 Get")
    @GetMapping("/api/post/{tourId}/review")
    public ResponseEntity<CMRespDto<?>> getReviews(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getReviewList(tourId)));
    }

    //리뷰 Create -----------------------------------------------------------------
    @ApiOperation(value = "registerReview", notes = "리뷰 생성")
    @ValidAspect
    @PostMapping("/api/post/{tourId}/review")
    public ResponseEntity<CMRespDto<?>> registerReview(@PathVariable int tourId, @RequestBody @Valid ReviewReqDto reviewReqDto, BindingResult bindingResult) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.registerReviewAndRating(tourId, reviewReqDto)));
    }

    //리뷰 이미지 Create -----------------------------------------------------------
    @ApiOperation(value = "registerReviewImg", notes = "리뷰 이미지 등록")
    @PostMapping("/api/post/{commentId}/review/image")
    public ResponseEntity<CMRespDto<?>> registerReviewImages(@PathVariable int commentId, @RequestPart List<MultipartFile> files) {
        postService.registerReviewImages(commentId, files);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    //리뷰 Delete -----------------------------------------------------------------
    @ApiOperation(value = "deleteReview", notes = "리뷰 삭제")
    @ValidAspect
    @DeleteMapping("/api/post/{tourId}/review")
    public ResponseEntity<CMRespDto<?>> deleteReview(@PathVariable int tourId, @RequestBody @Valid DeleteReviewDto deleteReviewDto, BindingResult bindingResult) {

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.deleteReviewAndImages(deleteReviewDto)));
    }

    //카테고리 Get -----------------------------------------------------------------
    @ApiOperation(value = "getCategory", notes = "카테고리 리스트 가져오기")
    @GetMapping("/api/post/categories")
    public ResponseEntity<CMRespDto<?>> getCategoryList() {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getCategoryList()));
    }

    //태그 Get --------------------------------------------------------------------
    @ApiOperation(value = "getTag", notes = "태그 리스트 가져오기")
    @GetMapping("/api/post/{categoryId}/tags")
    public ResponseEntity<CMRespDto<?>> getTagList(@PathVariable int categoryId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getTourTagList(categoryId)));
    }

    //게시글 태그 Get --------------------------------------------------------------
    @ApiOperation(value = "getTourTag", notes = "해당 게시글의 태그 가져오기")
    @GetMapping("/api/post/{tourId}/tag")
    public ResponseEntity<CMRespDto<?>> getTourTag(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getPostTag(tourId)));
    }

    //게시글 태그 Create -----------------------------------------------------------
    @ApiOperation(value = "registerTourTag", notes = "해당 게시글에 태그 등록하기")
    @PostMapping("/api/post/register/{tourId}/tag")
    public ResponseEntity<CMRespDto<?>> registerTags(@PathVariable int tourId, @RequestBody TagReqDto tagReqDto) {
        postService.registerTourTag(tourId, tagReqDto);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", true));
    }

    //게시글 태그 Delete ------------------------------------------------------------
    @ApiOperation(value = "deleteTourTag", notes = "해당 게시글의 태그 삭제하기")
    @DeleteMapping("/api/post/{tourId}/tag")
    public ResponseEntity<CMRespDto<?>> deleteTags(@PathVariable int tourId) {

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.deleteTagDtl(tourId)));
    }

    //게시글 좋아요개수 Get -----------------------------------------------------------
    @ApiOperation(value = "getLike", notes = "해당 게시글의 좋아요 개수 가져오기")
    @GetMapping("/api/post/{tourId}/likes")
    public ResponseEntity<CMRespDto<?>> getLikeCount(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getLikeCount(tourId)));
    }

    //게시글 좋아요 여부 Get ----------------------------------------------------------
    @ApiOperation(value = "getLikeStatus", notes = "로그인 된 유저의 해당 게시글 좋아요 여부 가져오기")
    @ValidAspect
    @PostMapping("/api/post/like")
    public ResponseEntity<CMRespDto<?>> isLike(@RequestBody @Valid LikeReqDto likeReqDto, BindingResult bindingResult) {
        System.out.println(likeReqDto);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.isLike(likeReqDto)));
    }

    //게시글 좋아요 Toggle -----------------------------------------------------------
    @ApiOperation(value = "toggleLike", notes = "좋아요 -> 좋아요취소, 좋아요상태아님 -> 좋아요")
    @ValidAspect
    @PostMapping("/api/post/{tourId}/like")
    public ResponseEntity<CMRespDto<?>> toggleLike(@PathVariable int tourId,@RequestBody @Valid LikeReqDto likeReqDto, BindingResult bindingResult) {
        if(postService.isLike(likeReqDto)) {
            postService.deleteLike(likeReqDto);
        } else {
            postService.registerLike(likeReqDto);
        }
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", true));
    }

    //게시글 좋아요 Delete -----------------------------------------------------------
    @ApiOperation(value = "deleteLike", notes = "좋아요 상태 삭제")
    @ValidAspect
    @DeleteMapping("/api/post/{tourId}/like")
    public ResponseEntity<CMRespDto<?>> deleteLike(@PathVariable int tourId, @RequestBody @Valid LikeReqDto likeReqDto, BindingResult bindingResult) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.deleteLike(likeReqDto)));
    }
}
