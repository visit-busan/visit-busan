package com.korit.visitbusan.repository.admin;

import com.korit.visitbusan.entity.admin.AdminCategoryMst;
import com.korit.visitbusan.entity.admin.AdminTagMst;
import com.korit.visitbusan.web.dto.admin.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/*******************************************
 *** 작성자 : 권오광
 *  버전 : V0.1
 *  내용 : 관광정보 테그 처리를 위한 Repository
 *  작성일 : 2023.03.10
 *******************************************/

@Mapper
public interface AdminTagRepository {

    /*
    C: 태그등록 등록
    R: 1. 테그 전체 조회
            1. 검색
                1. 테그명
            2. 카테고리
                1. 전체조회
                2. 20개씩 가져오기
     U: 테그 수정
     D: 테그 삭제
     */

    /*테그 전체 개수*/
    public int getTagTotalCount(AdminSearchTagListDto adminSearchTagListDto);

    /*테그 데이터 조회*/
    public List<AdminTagMst> searchTag(AdminSearchTagReqDto adminSearchTagReqDto);

    /*테그 이름으로 데이터 조회*/
    public AdminTagMst findTagByTagName(String tagName);

    /*테그 등록*/
    public int registerTag(AdminTagReqDto adminTagReqDto);

    /*테그 수정 put*/
    public int updateTagByTagId(AdminTagReqDto adminTagReqDto);

    /*테그 삭제*/
    public int deleteTag(int tagId);

    /*테그 일괄삭제*/
    public int deleteTags(List<Integer> tagIds);

}
