package com.korit.visitbusan.web.api.admin;

import com.korit.visitbusan.aop.annotation.ParamsAspect;
import com.korit.visitbusan.aop.annotation.ValidAspect;
import com.korit.visitbusan.entity.admin.AdminCategoryMst;
import com.korit.visitbusan.entity.admin.AdminTourMst;
import com.korit.visitbusan.service.admin.AdminCategoryService;
import com.korit.visitbusan.service.admin.AdminTourService;
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

@Api(tags = {"관리자 관광정보 관리 API"})
@RequestMapping("/api/admin")
@RestController
public class AdminTourApi {

    @Autowired
    private AdminTourService adminTourService;

    @ParamsAspect
    @ValidAspect
    @ApiOperation(value = "관광정보 조회", notes = "관광정보를 조회 설정값에 맞게 불러오는 API입니다.")
    @GetMapping("/tours")
    public ResponseEntity<CMRespDto<List<AdminTourMst>>> searchTour(@Valid AdminSearchTourReqDto adminSearchTourReqDto, BindingResult bindingResult) {
//        System.out.println(adminSearchTourReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",adminTourService.searchTour(adminSearchTourReqDto)));
    }

    @ApiOperation(value = "관광정보 개수 조회", notes = "관광정보 페이지네이션을 위한 API입니다.")
    @GetMapping("/tour/totalcount")
    public ResponseEntity<CMRespDto<?>> getTourTotalCount(AdminSearchTourListDto adminSearchTourListDto) {
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully",adminTourService.getTourTotalCount(adminSearchTourListDto)));
    }

    @ParamsAspect
    @ApiOperation(value = "관광정보 삭제", notes = "관광정보 삭제를 위한 API입니다.")
    @DeleteMapping("/tour/{tourId}")
    public ResponseEntity<CMRespDto<?>> removeTour(@PathVariable int tourId) {
        adminTourService.removeTour(tourId);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", true));
    }

    @ParamsAspect
    @ApiOperation(value = "관광정보 일괄삭제", notes = "관광정보 일괄삭제를 위한 API입니다.")
    @DeleteMapping("/tours")
    public ResponseEntity<CMRespDto<?>> removeTours(@RequestBody AdminDeleteToursReqDto adminDeleteToursReqDto) {
        adminTourService.removeTours(adminDeleteToursReqDto);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", true));
    }
}
