package com.korit.visitbusan.service;

import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.exception.CustomRegisterException;
import com.korit.visitbusan.exception.CustomValidationException;
import com.korit.visitbusan.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
/*******************************************
 *** 작성자 : 이성욱
 *  버전 : V0.1
 *  내용 :  회원정보 관리를 위한 Service
 *  최종작성일 : 2023.03.11
 *******************************************/
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public UserMst findUsername(String name, String tellNumber) {
        return accountRepository.findUsername(name, tellNumber);
    }

    public UserMst findPassword(String username, String name, String tellNumber) {
        return accountRepository.findPassword(username, name, tellNumber);
    }
    public int changePassword(String password, String username, String name, String tellNumber) {
        return accountRepository.changePassword(password, username, name, tellNumber);
    }

//    public void modifyPw(UserMst userMst) throws Exception {
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        String newPassword = encoder.
//                encode(userMst.getPassword());
//        userMst.setPassword(newPassword);
//        accountRepository.saveUser(userMst);
//        accountRepository.saveRole(userMst);
//    }

    public UserMst registerUser(UserMst userMst) {
        userMst.setPassword(new BCryptPasswordEncoder().encode(userMst.getPassword()));
        accountRepository.saveUser(userMst);
        accountRepository.saveRole(userMst);

        return userMst;
    }

    public void duplicateUsername(String username) {
        UserMst userMst = accountRepository.findByUsername(username);
        if(userMst != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("username", "이미 사용중인 사용자 아이디 입니다.");
            throw new CustomRegisterException("회원가입 오류(Duplicate username)",errorMap);
        }
    }

    public void comparePassword(String password, String repassword) {
        if(!password.equals(repassword)) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("password", "비밀번호가 일치하지 않습니다.");

            throw new CustomValidationException(errorMap);
        }
    }
    public UserMst getUser(int userId) {
        return accountRepository.findUserByUserId(userId);
    }
    public int deleteUser(int userId) {
        return accountRepository.deleteUser(userId);
    }
}
