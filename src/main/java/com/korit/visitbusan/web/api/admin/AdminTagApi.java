package com.korit.visitbusan.web.api.admin;

import com.korit.visitbusan.aop.annotation.ParamsAspect;
import com.korit.visitbusan.aop.annotation.ValidAspect;
import com.korit.visitbusan.entity.admin.AdminCategoryMst;
import com.korit.visitbusan.entity.admin.AdminTagMst;
import com.korit.visitbusan.service.admin.AdminCategoryService;
import com.korit.visitbusan.service.admin.AdminTagService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.admin.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags = {"관리자 관광지 테그 관리 API"})
@RequestMapping("/api/admin")
@RestController
public class AdminTagApi {

    @Autowired
    private AdminTagService adminTagService;

    @ParamsAspect
    @ValidAspect
    @ApiOperation(value = "관광지 태그 조회", notes = "관광지 태그를 조회 설정값에 맞게 불러오는 API입니다.")
    @GetMapping("/tags")
    public ResponseEntity<CMRespDto<List<AdminTagMst>>> searchTag(@Valid AdminSearchTagReqDto adminSearchTagReqDto, BindingResult bindingResult) {
//        System.out.println(adminSearchTagReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",adminTagService.searchTag(adminSearchTagReqDto)));
    }

    @ApiOperation(value = "태그 Id로 태그 조회", notes = "관광지 태그를 태그 ID로 불러오는 API입니다.")
    @GetMapping("/tag/{tagId}")
    public ResponseEntity<CMRespDto<?>> getTagByTagId(@PathVariable int tagId) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",adminTagService.getTagByTagId(tagId)));
    }

    @ApiOperation(value = "관광지 태그 개수조회", notes = "관광지 태그 페이지네이션을 위한 API입니다.")
    @GetMapping("/tag/totalcount")
    public ResponseEntity<CMRespDto<?>> getTagTotalCount(AdminSearchTagListDto adminSearchTagListDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",adminTagService.getTagTotalCount(adminSearchTagListDto)));
    }

    @ParamsAspect
    @ValidAspect
    @ApiOperation(value = "관광지 태그 등록", notes = "관광지 태그 등록을 위한 API입니다.")
    @PostMapping("/tag")
    public ResponseEntity<CMRespDto<?>> registerTag(@Valid @RequestBody AdminTagReqDto adminTagReqDto, BindingResult bindingResult) {
        adminTagService.registerTag(adminTagReqDto);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Successfully", true));
    }

    @ParamsAspect
    @ValidAspect
    @ApiOperation(value = "관광지 태그 수정", notes = "관광지 태그 수정을 위한 API입니다.")
    @PutMapping("/tag/{tagId}")
    public ResponseEntity<CMRespDto<?>> modifyTag(@PathVariable int tagId, @Valid @RequestBody AdminTagReqDto adminTagReqDto, BindingResult bindingResult) {
        adminTagService.modifyTag(adminTagReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @ApiOperation(value = "관광지 태그 삭제", notes = "관광지 태그 삭제를 위한 API입니다.")
    @DeleteMapping("/tag/{tagId}")
    public ResponseEntity<CMRespDto<?>> removeTag(@PathVariable int tagId) {
        adminTagService.removeTag(tagId);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", true));
    }

    @ParamsAspect
    @ApiOperation(value = "관광지 태그 일괄삭제", notes = "관광지 태그 일괄삭제를 위한 API입니다.")
    @DeleteMapping("/tags")
    public ResponseEntity<CMRespDto<?>> removeTags(@RequestBody AdminDeleteTagsReqDto adminDeleteTagsReqDto) {
        adminTagService.removeTags(adminDeleteTagsReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", true));
    }


}
