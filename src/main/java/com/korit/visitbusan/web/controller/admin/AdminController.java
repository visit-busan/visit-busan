package com.korit.visitbusan.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String dashBoard() {
        return "/admin/dashboard/tour_dashboard";
    }

    @GetMapping("/tour/category")
    public String tourCategory() {
        return "/admin/tour/category/tour_category";
    }

    @GetMapping("/tour/search")
    public String tourSearch() {
        return "/admin/tour/manage/tour_search";
    }

    @GetMapping("/user/info")
    public String userInfo() {
        return "/admin/user/user_info";
    }

    @GetMapping("/user/role")
    public String userRole() {
        return "/admin/user/user_role";
    }

}
