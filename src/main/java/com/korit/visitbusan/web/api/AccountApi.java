package com.korit.visitbusan.web.api;

import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.service.AccountService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.Find;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountApi {

    private final AccountService accountService;

    public ResponseEntity<? extends CMRespDto<? extends UserMst>> register (@RequestBody @Valid UserMst userMst, BindingResult bindingResult) {
        return null;
    }

    @GetMapping("/find")
    public ResponseEntity<?> findId (@RequestBody Find find, BindingResult bindingResult) {
        UserMst userMst = accountService.findId(find.getName(), find.getTellNumber());
        System.out.println(userMst);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Success", userMst));
    }

}
