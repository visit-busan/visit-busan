package com.korit.visitbusan.service.admin;

import com.korit.visitbusan.entity.admin.AdminCategoryMst;
import com.korit.visitbusan.entity.admin.AdminCategoryView;
import com.korit.visitbusan.exception.CustomValidationException;
import com.korit.visitbusan.repository.admin.AdminCategoryRepository;
import com.korit.visitbusan.web.dto.ReviewRespDto;
import com.korit.visitbusan.web.dto.admin.AdminCategoryReqDto;
import com.korit.visitbusan.web.dto.admin.AdminDeleteCategoriesReqDto;
import com.korit.visitbusan.web.dto.admin.AdminSearchCategoryListDto;
import com.korit.visitbusan.web.dto.admin.AdminSearchCategoryReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*******************************************
 *** 작성자 : 권오광
 *  버전 : V0.1
 *  내용 : 관광지 카테고리 정보 불러오기 위한 Service
 *  작성일 : 2023.03.02
 *******************************************/

@Service
public class AdminCategoryService {

    @Value("${file.path}")
    private String filePath;

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    public int getCategoryTotalCount(AdminSearchCategoryListDto adminSearchCategoryListDto) {
        return adminCategoryRepository.getCategoryTotalCount(adminSearchCategoryListDto);
    }

    public List<AdminCategoryMst> searchCategory(AdminSearchCategoryReqDto adminSearchCategoryReqDto) {
        adminSearchCategoryReqDto.setIndex();
        return adminCategoryRepository.searchCategory(adminSearchCategoryReqDto);
    }

    public List<AdminCategoryView> getCategories() {
        return adminCategoryRepository.findAllCategory();
    }

    public AdminCategoryMst getCategoryByCategoryId(int categoryId) {
        return adminCategoryRepository.findCategoryByCategoryId(categoryId);
    }

    public void registerCategory(AdminCategoryReqDto adminCategoryReqDto) {
        duplicateCategoryName(adminCategoryReqDto.getCategoryName());
        adminCategoryRepository.registerCategory(adminCategoryReqDto);
    }

    public void duplicateCategoryName(String categoryName) {
        AdminCategoryMst adminCategoryMst = adminCategoryRepository.findCategoryByCategoryName(categoryName);
        if(adminCategoryMst!= null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("categoryName", "이미 존재하는 카테고리 이름입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public void modifyCategory(AdminCategoryReqDto adminCategoryReqDto) {
        duplicateCategoryName(adminCategoryReqDto.getCategoryName());
        adminCategoryRepository.updateCategoryByCategoryId(adminCategoryReqDto);
    }

    public void removeCategory(int categoryId) {
        adminCategoryRepository.deleteCategory(categoryId);
    }

    public void removeCategories(AdminDeleteCategoriesReqDto adminDeleteCategoriesReqDto) {
        adminCategoryRepository.deleteCategories(adminDeleteCategoriesReqDto.getCategoryIds());
    }
}
