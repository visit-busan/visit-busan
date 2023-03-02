package com.korit.visitbusan.repository.admin;

import com.korit.visitbusan.entity.admin.AdminTourCategoryMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/*******************************************
 *** 작성자 : 권오광
 *  버전 : V0.1
 *  내용 : 관광정보 카테고리 조회 데이터 처리를 위한 Repository
 *  작성일 : 2023.03.02
 *******************************************/

@Mapper
public interface AdminCategoryRepository {

    /*
    C: 카테고리 등록
    R: 1. 카테고리 전체 조회
            1. 검색
                1. 카테고리명
            2. 카테고리
                1. 전체조회
                2. 20개씩 가져오기
     U: 카테고리 수정
     D: 카테고리 삭제
     */

    public int getcategoryTotalCount();
    public List<AdminTourCategoryMst> searchCategory();


}
