package com.korit.visitbusan.web.api;

import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.security.PrincipalDetails;
import com.korit.visitbusan.service.AccountService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.Find;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URL;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/account")
public class AccountApi {

    @Autowired
    private final AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<? extends CMRespDto<? extends UserMst>> register (@RequestBody @Valid UserMst userMst, BindingResult bindingResult) {


        accountService.duplicateUsername(userMst.getUsername());
        accountService.comparePassword(userMst.getPassword(), userMst.getRepassword());
        System.out.println(userMst);
        UserMst user = accountService.registerUser(userMst);

        return ResponseEntity
                    .created(URI.create("/api/account/user/" + user.getUserId()))
                .body(new CMRespDto<>(HttpStatus.CREATED.value(), "회원가입 완료", user));
    }

    //  user객체 가져오는 방법


    @GetMapping("/user/{userId}")
    public ResponseEntity<? extends CMRespDto<? extends UserMst>> getUser(@PathVariable int userId) {
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "회원 정보 조회", accountService.getUser(userId)));
    }

    @GetMapping("/principal")
    public ResponseEntity<CMRespDto<? extends PrincipalDetails>> getPrincipalDetails(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails != null) {
            principalDetails.getAuthorities().forEach(role -> {
                    log.info("로그인된 사용자의 권한: {}", role.getAuthority());
            });
        }

        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "로그인된 사용자 정보 가져오기 완료", principalDetails));
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
