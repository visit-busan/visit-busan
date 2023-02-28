package com.korit.visitbusan.web.api;

import com.korit.visitbusan.service.PostService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.PostImgRespDto;
import com.korit.visitbusan.web.dto.ReviewReqDto;
import com.korit.visitbusan.web.dto.TourReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostApi {

    private final PostService postService;

    //Summernote를 활용한 게시글 이미지 업로드 로직
    @PostMapping("/uploadSummernoteImageFile")
    public ResponseEntity<CMRespDto<PostImgRespDto>> uploadSummernoteImageFile(@RequestPart List<MultipartFile> file) {

        List<String> pathList = postService.registerPostImg(file);

        PostImgRespDto postImgRespDto = PostImgRespDto.builder().url(pathList.get(0)).build();
        System.out.println(postImgRespDto);
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", postImgRespDto));
    }

    //게시글 업로드
    @PostMapping("api/post/register")
    public ResponseEntity<?> registerPost(@RequestBody TourReqDto tourReqDto) {
        System.out.println(tourReqDto);

        postService.registerPost(tourReqDto);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", tourReqDto.getTourId()));
    }

    //게시글 썸네일 업로드
    @PostMapping("/api/post/register/{tourId}/thumbnail")
    public ResponseEntity<CMRespDto<?>> uploadThumbnailFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.registerThumbnailImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    //게시글 메인이미지 업로드
    @PostMapping("/api/post/register/{tourId}/mainimg")
    public ResponseEntity<CMRespDto<?>> uploadMainImageFile(@PathVariable String tourId, @RequestPart List<MultipartFile> files) {
        postService.registerMainImg(tourId, files);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "img upload", true));
    }

    //게시글 정보 가져오기
    @GetMapping("/api/post/{tourId}")
    public ResponseEntity<CMRespDto<?>> getPostByTourId(@PathVariable int tourId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", postService.getPostByTourId(tourId)));
    }

    @PostMapping("/api/post/register/review")
    public ResponseEntity<CMRespDto<?>> registerReview(@RequestBody ReviewReqDto reviewReqDto) {
        postService.registerReviewAndRating(reviewReqDto);

        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", true));
    }
}
