package com.korit.visitbusan.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
/*******************************************
 *** 작성자 : 이성욱
 *  버전 : V0.1
 *  내용 :  메인화면 및 마이페이지 controller
 *  작성일 : 2023.03.03
 *******************************************/
@Controller
public class IndexController {

    @GetMapping({"","/index"})
    public String getIndex() {
        return "index";
    }

    @GetMapping("/mypage")
    public String getMypage() {
        return "account/mypage";
    }
}
