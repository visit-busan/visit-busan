package com.korit.visitbusan.repository;

import com.korit.visitbusan.entity.CategoryMst;
import com.korit.visitbusan.entity.SearchResult;
import com.korit.visitbusan.web.dto.SearchReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  검색을 위한 Repository
 *  작성일 : 2023.03.09
 *******************************************/
@Mapper
public interface SearchRepository {
    public List<CategoryMst> searchTourByCategoryName(CategoryMst categoryMst);

    //검색결과 Get ----------------------------------------------------------------
    public List<SearchResult> searchTour(SearchReqDto searchReqDto);
    public int getTotalCount(SearchReqDto searchReqDto);

    //태그 Get---------------------------------------------------------------------
    public List<String> getTags(int categoryId);

    //카테고리이름 Get---------------------------------------------------------------
    public String getCategoryName (int categoryId);
}
