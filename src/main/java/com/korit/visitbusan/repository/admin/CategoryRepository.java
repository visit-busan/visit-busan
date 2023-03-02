package com.korit.visitbusan.repository.admin;

import com.korit.visitbusan.entity.admin.TourCategoryMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryRepository {

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
    public List<TourCategoryMst> searchCategory();


}
