package com.korit.visitbusan.web.controller;

import com.korit.visitbusan.service.PostService;
import com.korit.visitbusan.web.dto.TourReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/post")
public class PostController {

    @GetMapping("")
    public String post() { return "post/post"; }
    @GetMapping("/modify")
    public String modifyPost() {
        return "/post/modify-post";
    }

    @GetMapping("/register")
    public String register() {
        return "/post/register-post";
    }

}
