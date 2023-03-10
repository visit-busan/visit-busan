package com.korit.visitbusan.web.controller;

import com.korit.visitbusan.service.PostService;
import com.korit.visitbusan.web.dto.TourReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
/*******************************************
 *** 작성자 : 정순동
 *  버전 : V0.1
 *  내용 :  게시글 관련기능 controller
 *  작성일 : 2023.03.03
 *******************************************/
@Controller
@RequestMapping("/post")
public class PostController {

    @GetMapping("")
    public String post() { return "post/post"; }
    @GetMapping("/modify/{tourId}")
    public String modifyPost() {
        return "/post/modify-post";
    }

    @GetMapping("/register")
    public String register() {
        return "/post/register-post";
    }

}
