package com.korit.visitbusan.service.admin;

import com.korit.visitbusan.entity.admin.AdminCategoryMst;
import com.korit.visitbusan.entity.admin.AdminTagMst;
import com.korit.visitbusan.entity.admin.AdminTourMst;
import com.korit.visitbusan.exception.CustomValidationException;
import com.korit.visitbusan.repository.admin.AdminCategoryRepository;
import com.korit.visitbusan.repository.admin.AdminTourRepository;
import com.korit.visitbusan.web.dto.admin.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*******************************************
 *** 작성자 : 권오광
 *  버전 : V0.1
 *  내용 : 관광정보 조회를 위한 Service
 *  작성일 : 2023.03.02
 *******************************************/

@Service
public class AdminTourService {

    @Value("${file.path}")
    private String filePath;

    @Autowired
    private AdminTourRepository adminTourRepository;

    public int getTourTotalCount(AdminSearchTourListDto adminSearchTourListDto) {
        return adminTourRepository.getTourTotalCount(adminSearchTourListDto);
    }

    public List<AdminTourMst> searchTour(AdminSearchTourReqDto adminSearchTourReqDto) {
        adminSearchTourReqDto.setIndex();
        return adminTourRepository.searchTour(adminSearchTourReqDto);
    }

    public AdminTourMst getTourByTourId(int tourId) {
        return adminTourRepository.findTourByTourId(tourId);
    }

    public void removeTour(int tourId) {
        adminTourRepository.deleteTour(tourId);
    }

    public void removeTours(AdminDeleteToursReqDto adminDeleteToursReqDto) {
        adminTourRepository.deleteTours(adminDeleteToursReqDto.getTourIds());
    }
}
