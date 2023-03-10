package com.korit.visitbusan.web.api.admin;

import com.korit.visitbusan.aop.annotation.ParamsAspect;
import com.korit.visitbusan.aop.annotation.ValidAspect;
import com.korit.visitbusan.entity.admin.AdminCategoryMst;
import com.korit.visitbusan.service.admin.AdminCategoryService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.admin.AdminCategoryReqDto;
import com.korit.visitbusan.web.dto.admin.AdminDeleteCategoriesReqDto;
import com.korit.visitbusan.web.dto.admin.AdminSearchCategoryListDto;
import com.korit.visitbusan.web.dto.admin.AdminSearchCategoryReqDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@Api(tags = {"관리자 관광지 카테고리 관리 API"})
@RequestMapping("/api/admin")
@RestController
public class AdminCategoryApi {

    @Autowired
    private AdminCategoryService adminCategoryService;

    @ParamsAspect
    @ValidAspect
    @ApiOperation(value = "관광지 분류 조회", notes = "관광지 분류를 조회 설정값에 맞게 불러오는 API입니다.")
    @GetMapping("/categories")
    public ResponseEntity<CMRespDto<List<AdminCategoryMst>>> searchCategory(@Valid AdminSearchCategoryReqDto adminSearchCategoryReqDto, BindingResult bindingResult) {
//        System.out.println(adminSearchCategoryReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",adminCategoryService.searchCategory(adminSearchCategoryReqDto)));
    }

    @GetMapping("/category/totalcount")
    public ResponseEntity<CMRespDto<?>> getCategoryTotalCount(AdminSearchCategoryListDto adminSearchCategoryListDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",adminCategoryService.getCategoryTotalCount(adminSearchCategoryListDto)));
    }

    @ParamsAspect
    @ValidAspect
    @PostMapping("/category")
    public ResponseEntity<CMRespDto<?>> registerCategory(@Valid @RequestBody AdminCategoryReqDto adminCategoryReqDto, BindingResult bindingResult) {
        adminCategoryService.registerCategory(adminCategoryReqDto);
        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "Successfully", true));

    }

    @ParamsAspect
    @ValidAspect
    @PutMapping("/category/{categoryId}")
    public ResponseEntity<CMRespDto<?>> modifyCategory(@PathVariable int categoryId, @Valid @RequestBody AdminCategoryReqDto adminCategoryReqDto, BindingResult bindingResult) {
        adminCategoryService.modifyCategory(adminCategoryReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @DeleteMapping("/category/{categoryId}")
    public ResponseEntity<CMRespDto<?>> removeCategory(@PathVariable int categoryId) {
        adminCategoryService.removeCategory(categoryId);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", true));
    }

    @ParamsAspect
    @DeleteMapping("/categories")
    public ResponseEntity<CMRespDto<?>> removeCategories(@RequestBody AdminDeleteCategoriesReqDto adminDeleteCategoriesReqDto) {
        adminCategoryService.removeCategories(adminDeleteCategoriesReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", true));
    }


}
