package com.korit.visitbusan.web.api;

import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountApi {

    public ResponseEntity<? extends CMRespDto<? extends UserMst>> register (@RequestBody @Valid UserMst userMst, BindingResult bindingResult) {
        return null;
    }

}
