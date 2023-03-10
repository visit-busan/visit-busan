package com.korit.visitbusan.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  검색을 위한 mvc controller
 *  작성일 : 2023.03.09
 *******************************************/
@Controller
@RequestMapping("/search")
public class SearchController {

    @GetMapping("")
    public String searchTourByCategoryName() {
        return "search/search";
    }
}
