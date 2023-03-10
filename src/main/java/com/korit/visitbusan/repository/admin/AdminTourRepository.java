package com.korit.visitbusan.repository.admin;

import com.korit.visitbusan.entity.admin.AdminCategoryMst;
import com.korit.visitbusan.entity.admin.AdminTourMst;
import com.korit.visitbusan.web.dto.admin.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/*******************************************
 *** 작성자 : 권오광
 *  버전 : V0.1
 *  내용 : 관광정보 조회 데이터 처리를 위한 Repository
 *  작성일 : 2023.03.02
 *******************************************/

@Mapper
public interface AdminTourRepository {

        /*
    C: FRONT 페이지로 연결
    R: 1. 관광지 전체 조회
            1. 검색
                1. 카테고리명
                2. 관광지명, 관광지 코드, 작가ID
            2. 카테고리
                1. 전체조회
                2. 20개씩 가져오기
     U: FRONT 해당 게시글 수정 페이지로 이동
     D: 해당 관광지 삭제
     */

    /*관광정보 전체 개수*/
    public int getTourTotalCount(AdminSearchTourListDto adminSearchTourListDto);

    /*관광정보 데이터 조회*/
    public List<AdminTourMst> searchTour(AdminSearchTourReqDto adminSearchTourReqDto);

    /*관광정보 저장*/
    public int registerTour(AdminTourReqDto adminTourReqDto);

    /*관광정보 수정 put*/
    public int updateTourByTourId(AdminTourReqDto adminTourReqDto);

    /*관광정보 삭제*/
    public int deleteTour(int tourId);

    /*관광정보 일괄삭제*/
    public int deleteTours(List<Integer> tourIds);
}
