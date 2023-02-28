package com.korit.visitbusan.service;

import com.korit.visitbusan.entity.CategoryMst;
import com.korit.visitbusan.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    public SearchRepository searchRepository;

    public List<CategoryMst> searchTourByCategoryName(CategoryMst categoryMst) {

        return searchRepository.searchTourByCategoryName(categoryMst);
    }
}
