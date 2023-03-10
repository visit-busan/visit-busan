package com.korit.visitbusan.web.api;

import com.korit.visitbusan.service.PostService;
import com.korit.visitbusan.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 관련 RestController
 *  작성일 : 2023.03.03
 *******************************************/
@RestController
@RequiredArgsConstructor
public class PostApi {

    private final PostService postService;

    //SummerNote 이미지파일 Create --------------------------------------------------
    @PostMapping("/uploadSummernoteImageFile")
    public ResponseEntity<CMRespDto<PostImgRespDto>> uploadSummernoteImageFile(@RequestPart List<MultipartFile> file) {

        List<String> pathList = postService.registerPostImg(file);

        PostImgRespDto postImgRespDto = PostImgRespDto.builder().url(pathList.get(0)).build();
        System.out.println(postImgRespDto);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", postImgRespDto));
    }

    //게시글 Read ------------------------------------------------------------------
    @GetMapping("/api/post/{tourId}")
    public ResponseEntity<CMRespDto<?>> getPostByTourId(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getPostByTourId(tourId)));
    }

    //게시글 Create ----------------------------------------------------------------
    @PostMapping("api/post/register")
    public ResponseEntity<?> registerPost(@RequestBody TourReqDto tourReqDto) {
        System.out.println(tourReqDto);

        postService.registerTourMst(tourReqDto);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", tourReqDto.getTourId()));
    }

    //게시글 Delete ----------------------------------------------------------------
    @DeleteMapping("/api/post/{tourId}")
    public ResponseEntity<?> deletePost(@PathVariable int tourId) {
        String ti = "" + tourId;
        postService.deleteThumbnail(ti);
        postService.deleteMainImg(ti);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.deletePost(tourId)));
    }

    //게시글 썸네일 Create ----------------------------------------------------------
    @PostMapping("/api/post/register/{tourId}/thumbnail")
    public ResponseEntity<CMRespDto<?>> uploadThumbnailFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.registerThumbnailImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    @PostMapping("/api/post/register/{tourId}/thumbnail/link")
    public ResponseEntity<CMRespDto<?>> registerThumbnailFileWithLink(@PathVariable String tourId, @RequestBody LinkImg linkImg) {
        postService.registerThumbnailImgWithLink(tourId, linkImg.getLink());

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    //게시글 메인이미지 Create -------------------------------------------------------
    @PostMapping("/api/post/register/{tourId}/mainimg")
    public ResponseEntity<CMRespDto<?>> uploadMainImageFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.registerMainImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    @PostMapping("/api/post/register/{tourId}/mainimg/link")
    public ResponseEntity<CMRespDto<?>> registerMainImageFileWithLink(@PathVariable String tourId, @RequestBody LinkImg linkImg) {
        postService.registerMainImgWithLink(tourId, linkImg.getLink());

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    //게시글 Update ----------------------------------------------------------------
    @PutMapping("/api/post/{tourId}")
    public ResponseEntity<CMRespDto<?>> updatePost(@PathVariable int tourId, @RequestBody TourReqDto tourReqDto) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.updatePost(tourReqDto)));
    }

    //게시글 썸네일 Update ----------------------------------------------------------
    @PostMapping("/api/post/modify/{tourId}/thumbnail")
    public ResponseEntity<CMRespDto<?>> modifyThumbnailFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.deleteThumbnail(tourId);
        postService.registerThumbnailImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img modified", true));
    }

    @PostMapping("/api/post/modify/{tourId}/thumbnail/link")
    public ResponseEntity<CMRespDto<?>> modifyThumbnailFileWithLink(@PathVariable String tourId, @RequestBody LinkImg linkImg) {
        postService.deleteThumbnail(tourId);
        postService.registerThumbnailImgWithLink(tourId, linkImg.getLink());

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img modified", true));
    }

    //게시글 메인이미지 Update ------------------------------------------------------
    @PostMapping("/api/post/modify/{tourId}/mainimg")
    public ResponseEntity<CMRespDto<?>> modifyMainImageFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.deleteMainImg(tourId);
        postService.registerMainImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img modified", true));
    }
    @PostMapping("/api/post/modify/{tourId}/mainimg/link")
    public ResponseEntity<CMRespDto<?>> modifyMainImageFileWithLink(@PathVariable String tourId, @RequestBody LinkImg linkImg) {
        postService.deleteMainImg(tourId);
        postService.registerMainImgWithLink(tourId, linkImg.getLink());

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img modified", true));
    }

    //게시글 조회수 Read -----------------------------------------------------------
    @GetMapping("api/post/{tourId}/view")
    public ResponseEntity<CMRespDto<?>> getPostViewCount(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getPostViewCount(tourId)));
    }

    //게시글 조회수 Update ---------------------------------------------------------
    @PutMapping("/api/post/{tourId}/view")
    public ResponseEntity<CMRespDto<?>> createViewCount(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.updateViewCount(tourId)));
    }

    //리뷰 Read -------------------------------------------------------------------
    @GetMapping("/api/post/{tourId}/review")
    public ResponseEntity<CMRespDto<?>> getReviews(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getReviewList(tourId)));
    }

    //리뷰 Create -----------------------------------------------------------------
    @PostMapping("/api/post/{tourId}/review")
    public ResponseEntity<CMRespDto<?>> registerReview(@PathVariable int tourId, @RequestBody ReviewReqDto reviewReqDto) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.registerReviewAndRating(tourId, reviewReqDto)));
    }

    //리뷰 이미지 Create -----------------------------------------------------------
    @PostMapping("/api/post/{commentId}/review/image")
    public ResponseEntity<CMRespDto<?>> registerReviewImages(@PathVariable int commentId, @RequestPart List<MultipartFile> files) {
        postService.registerReviewImages(commentId, files);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    //리뷰 Delete -----------------------------------------------------------------
    @DeleteMapping("/api/post/{tourId}/review")
    public ResponseEntity<CMRespDto<?>> deleteReview(@PathVariable int tourId, @RequestBody DeleteReviewDto deleteReviewDto) {

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.deleteReviewAndImages(deleteReviewDto)));
    }

    //카테고리 Get -----------------------------------------------------------------
    @GetMapping("/api/post/categories")
    public ResponseEntity<CMRespDto<?>> getCategoryList() {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getCategoryList()));
    }

    //태그 Get --------------------------------------------------------------------
    @GetMapping("/api/post/{categoryId}/tags")
    public ResponseEntity<CMRespDto<?>> getTagList(@PathVariable int categoryId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getTourTagList(categoryId)));
    }

    //게시글 태그 Get --------------------------------------------------------------
    @GetMapping("/api/post/{tourId}/tag")
    public ResponseEntity<CMRespDto<?>> getTourTag(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getPostTag(tourId)));
    }

    //태그 Create -----------------------------------------------------------------
    @PostMapping("/api/post/register/{tourId}/tag")
    public ResponseEntity<CMRespDto<?>> registerTags(@PathVariable int tourId, @RequestBody TagReqDto tagReqDto) {
        postService.registerTourTag(tourId, tagReqDto);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", true));
    }

    //태그 Delete -----------------------------------------------------------------
    @DeleteMapping("/api/post/{tourId}/tag")
    public ResponseEntity<CMRespDto<?>> deleteTags(@PathVariable int tourId) {

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.deleteTagDtl(tourId)));
    }

    //게시글 좋아요개수 Get -----------------------------------------------------------
    @GetMapping("/api/post/{tourId}/likes")
    public ResponseEntity<CMRespDto<?>> getLikeCount(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getLikeCount(tourId)));
    }

    //게시글 좋아요 여부 Get ----------------------------------------------------------
    @PostMapping("/api/post/like")
    public ResponseEntity<CMRespDto<?>> isLike(@RequestBody LikeReqDto likeReqDto) {
        System.out.println(likeReqDto);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.isLike(likeReqDto)));
    }

    //게시글 좋아요 Create -----------------------------------------------------------
    @PostMapping("/api/post/{tourId}/like")
    public ResponseEntity<CMRespDto<?>> registerLike(@PathVariable int tourId,@RequestBody LikeReqDto likeReqDto) {
        if(postService.isLike(likeReqDto)) {
            postService.deleteLike(likeReqDto);
        } else {
            postService.registerLike(likeReqDto);
        }
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", true));
    }

    //게시글 좋아요 Delete -----------------------------------------------------------
    @DeleteMapping("/api/post/{tourId}/like")
    public ResponseEntity<CMRespDto<?>> deleteLike(@PathVariable int tourId,@RequestBody LikeReqDto likeReqDto) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.deleteLike(likeReqDto)));
    }
}
