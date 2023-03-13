package com.korit.visitbusan.web.api;

import com.korit.visitbusan.service.SearchService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.SearchReqDto;
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
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchApi {

    private final SearchService searchService;

    @PostMapping("/result")
    public ResponseEntity<CMRespDto<?>> getPost(@RequestBody SearchReqDto searchReqDto) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", searchService.searchResult(searchReqDto)));
    }

    @PostMapping("/total")
    public ResponseEntity<CMRespDto<?>> getTotalCount(@RequestBody SearchReqDto searchReqDto) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", searchService.getTotalCount(searchReqDto)));
    }

    @GetMapping("/{categoryId}/tags")
    public ResponseEntity<CMRespDto<?>> getTags(@PathVariable int categoryId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", searchService.getTags(categoryId)));
    }

    @GetMapping("/{categoryId}/category")
    public ResponseEntity<CMRespDto<?>> getCategory(@PathVariable int categoryId) {
        return ResponseEntity.ok(new CMRespDto<>(HttpStatus.OK.value(), "success", searchService.getCategoryName(categoryId)));
    }
}

