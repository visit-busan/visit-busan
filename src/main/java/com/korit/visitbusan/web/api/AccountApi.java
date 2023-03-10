package com.korit.visitbusan.web.api;

import com.korit.visitbusan.aop.annotation.ValidAspect;
import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.repository.AccountRepository;
import com.korit.visitbusan.security.PrincipalDetails;
import com.korit.visitbusan.service.AccountService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.ChangePassword;
import com.korit.visitbusan.web.dto.FindPassword;
import com.korit.visitbusan.web.dto.FindUsername;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Api(tags = "Account Rest API Controller")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/account")
public class AccountApi {

    @Autowired
    private final AccountService accountService;
    private final AccountRepository accountRepository;

    @GetMapping("/username")
    public ResponseEntity<?> duplicateUsername(@Valid UserMst userMst, BindingResult bindingResult) {
        System.out.println(bindingResult.getErrorCount());
        System.out.println(bindingResult.getFieldErrors ());
        accountService.duplicateUsername(userMst.getUsername());
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "가입이 가능한 아이디 입니다", true));
    }

    @ApiOperation(value = "회원가입", notes = "회원가입 요청")
    @ValidAspect
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


    @ApiOperation(value = "Get userid", notes = "회원정보 가져오기")
    @GetMapping("/user/{userId}")
    public ResponseEntity<? extends CMRespDto<? extends UserMst>> getUser(@PathVariable int userId) {
        return ResponseEntity.ok().body(new CMRespDto<>(HttpStatus.OK.value(), "회원 정보 조회", accountService.getUser(userId)));
    }
    @ApiOperation(value = "Get Principal", notes = "로그인된 사용자 정보 가져오기")
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
    @ApiOperation(value = "post username", notes = "사용자 아이디 찾기")
    @PostMapping("/find/username")
    public ResponseEntity<?> findUsername (@RequestBody FindUsername findUsername) {
        System.out.println(findUsername);
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value()
                        , "사용자 아이디 가져오기 완료"
                        , accountService.findUsername(findUsername.getName(), findUsername.getTellNumber()).getUsername()));
    }

    @ApiOperation(value = "post username", notes = "사용자 비밀번호 찾기")
    @PostMapping("/find/password")
    public ResponseEntity<?> findPassword (@RequestBody FindPassword findPassword) {
        System.out.println(findPassword);

        String password = accountService.findPassword(findPassword.getUsername(), findPassword.getName(), findPassword.getTellNumber()).getPassword();
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value()
                        , "사용자 비밀번호 가져오기 완료"
                        , accountService.findPassword(findPassword.getUsername(), findPassword.getName(), findPassword.getTellNumber()).getPassword()));
    }
    @ApiOperation(value = "change password", notes = "사용자 비밀번호 변경")
    @PatchMapping("/change/password")
    public ResponseEntity<?> changePassword (@RequestBody ChangePassword changePassword) {
        System.out.println(changePassword);
        int flag = accountService.changePassword(new BCryptPasswordEncoder().encode(changePassword.getPassword()), changePassword.getUsername(), changePassword.getName(), changePassword.getTellNumber());
        UserMst userMst = null;
        if (flag == 1) {
            userMst = accountService.findPassword(changePassword.getUsername(), changePassword.getName(), changePassword.getTellNumber());
        }
        System.out.println(userMst.getPassword());
        return ResponseEntity
                .ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "비밀번호 변경완료"
                , userMst));
    }
    @ApiOperation(value = "delete User", notes = "회원탈퇴")
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) {
        accountService.deleteUser(userId);
        return ResponseEntity
                .created(URI.create("/api/account/delete/" + userId))
                .body(new CMRespDto<>(HttpStatus.OK.value(), "회원 정보 삭제", accountService.deleteUser(userId)));
    }
}
