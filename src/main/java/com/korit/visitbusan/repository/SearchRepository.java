package com.korit.visitbusan.repository;

import com.korit.visitbusan.entity.CategoryMst;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SearchRepository {
    public List<CategoryMst> searchTourByCategoryName(CategoryMst categoryMst);
}
