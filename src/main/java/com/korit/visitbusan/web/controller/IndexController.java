package com.korit.visitbusan.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

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
