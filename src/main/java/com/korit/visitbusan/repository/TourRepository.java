package com.korit.visitbusan.repository;

import com.korit.visitbusan.entity.TourMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TourRepository {

    public TourMst deleteTour(TourMst tourMst);
}
