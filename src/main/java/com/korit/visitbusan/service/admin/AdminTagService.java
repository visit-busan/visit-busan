package com.korit.visitbusan.service.admin;

import com.korit.visitbusan.entity.admin.AdminCategoryMst;
import com.korit.visitbusan.entity.admin.AdminTagMst;
import com.korit.visitbusan.exception.CustomValidationException;
import com.korit.visitbusan.repository.admin.AdminCategoryRepository;
import com.korit.visitbusan.repository.admin.AdminTagRepository;
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
 *  내용 : 관광지 테그 정보 불러오기 위한 Service
 *  작성일 : 2023.03.02
 *******************************************/

@Service
public class AdminTagService {

    @Value("${file.path}")
    private String filePath;

    @Autowired
    private AdminTagRepository adminTagRepository;

    public int getTagTotalCount(AdminSearchTagListDto adminSearchTagListDto) {
        return adminTagRepository.getTagTotalCount(adminSearchTagListDto);
    }

    public List<AdminTagMst> searchTag(AdminSearchTagReqDto adminSearchTagReqDto) {
        adminSearchTagReqDto.setIndex();
        return adminTagRepository.searchTag(adminSearchTagReqDto);
    }

    public AdminTagMst getTagByTagId(int tagId) {
        return adminTagRepository.findTagByTagId(tagId);
    }

    public void registerTag(AdminTagReqDto adminTagReqDto) {
        duplicateTagName(adminTagReqDto.getTagName());
        adminTagRepository.registerTag(adminTagReqDto);
    }

    public void duplicateTagName(String tagName) {
        AdminTagMst adminTagMst = adminTagRepository.findTagByTagName(tagName);
        if(adminTagMst!= null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("tagName", "이미 존재하는 테그 이름입니다.");

            throw new CustomValidationException(errorMap);
        }
    }

    public void modifyTag(AdminTagReqDto adminTagReqDto) {
        adminTagRepository.updateTagByTagId(adminTagReqDto);
    }

    public void removeTag(int tagId) {
        adminTagRepository.deleteTag(tagId);
    }

    public void removeTags(AdminDeleteTagsReqDto adminDeleteTagsReqDto) {
        adminTagRepository.deleteTags(adminDeleteTagsReqDto.getTagIds());
    }
}
