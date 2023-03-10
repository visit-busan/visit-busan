package com.korit.visitbusan.service;

import com.korit.visitbusan.entity.CategoryMst;
import com.korit.visitbusan.entity.SearchResult;
import com.korit.visitbusan.repository.SearchRepository;
import com.korit.visitbusan.web.dto.SearchReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  검색을 위한 Service
 *  작성일 : 2023.03.09
 *******************************************/
@Service
public class SearchService {

    @Autowired
    public SearchRepository searchRepository;

    public List<CategoryMst> searchTourByCategoryName(CategoryMst categoryMst) {

        return searchRepository.searchTourByCategoryName(categoryMst);
    }

    public List<SearchResult> searchResult (SearchReqDto searchReqDto) {
        searchReqDto.setIndex();
        return searchRepository.searchTour(searchReqDto);
    }

    public int getTotalCount (SearchReqDto searchReqDto) {
        return searchRepository.getTotalCount(searchReqDto);
    }

    public List<String> getTags (int categoryId) {
        return searchRepository.getTags(categoryId);
    }

    public String getCategoryName (int categoryId) {
        return searchRepository.getCategoryName(categoryId);
    }
}
