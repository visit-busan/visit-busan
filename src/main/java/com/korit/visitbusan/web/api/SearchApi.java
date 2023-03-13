package com.korit.visitbusan.web.api;

import com.korit.visitbusan.service.SearchService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.SearchReqDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  검색을 위한 Api
 *  작성일 : 2023.03.09
 *******************************************/
@RestController
@Api(tags = {"검색관련 API"})
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchApi {

    private final SearchService searchService;

    @ApiOperation(value = "getPosts", notes = "검색조건으로 게시글 가져오기")
    @PostMapping("/result")
    public ResponseEntity<CMRespDto<?>> getPost(@RequestBody SearchReqDto searchReqDto) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", searchService.searchResult(searchReqDto)));
    }

    @ApiOperation(value = "getPostsTotalCount", notes = "검색조건으로 검색된 게시글 총개수 가져오기")
    @PostMapping("/total")
    public ResponseEntity<CMRespDto<?>> getTotalCount(@RequestBody SearchReqDto searchReqDto) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", searchService.getTotalCount(searchReqDto)));
    }

    @ApiOperation(value = "getTags", notes = "해당 category에 포함되는 태그 가져오기")
    @GetMapping("/{categoryId}/tags")
    public ResponseEntity<CMRespDto<?>> getTags(@PathVariable int categoryId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", searchService.getTags(categoryId)));
    }

    @ApiOperation(value = "getCategory", notes = "Category이름 가져오기")
    @GetMapping("/{categoryId}/category")
    public ResponseEntity<CMRespDto<?>> getCategory(@PathVariable int categoryId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", searchService.getCategoryName(categoryId)));
    }
}

