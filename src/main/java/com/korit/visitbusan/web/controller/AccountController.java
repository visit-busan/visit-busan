package com.korit.visitbusan.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
/*******************************************
 *** 작성자 : 이성욱
 *  버전 : V0.5
 *  내용 :  로그인 관련기능 controller
 *  최근작성일 : 2023.03.11
 *******************************************/
@Controller
@RequestMapping("/account")
public class AccountController {

    @GetMapping("/login")
    public String login() { return "account/login"; }

    @PostMapping("/login/error")
    public String loginError() {
        return "account/login_error";
    }

    @GetMapping("/register/terms")
    public String registerTerms() {
        return "account/terms_of_use";
    }

    @GetMapping("/register")
    public String register() {
            return "account/register";
    }

    @GetMapping("/find/username")
    public String findUsername() {
        return "account/id_find";
    }

    @GetMapping("/find/password")
    public String findPassword() {
        return "account/pw_find";
    }

    @GetMapping("/change/password")
    public String changePassword() {
        return "account/change_pw";
    }

    @GetMapping("/update/profile")
    public String updateProfile() {
        return "account/update_profile";
    }

    @GetMapping("/delete")
    public String deleteUser() {
        return "account/secession";
    }
}
