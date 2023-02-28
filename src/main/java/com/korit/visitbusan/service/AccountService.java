package com.korit.visitbusan.service;

import com.korit.visitbusan.entity.UserMst;
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
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public UserMst findId(String name, String tellNumber) {
        return accountRepository.findId(name, tellNumber);
    }

    public UserMst registerUser(UserMst userMst) {
        userMst.setPassword(new BCryptPasswordEncoder().encode(userMst.getPassword()));
        accountRepository.saveUser(userMst);
        accountRepository.saveRole(userMst);

        return userMst;
    }

    public void duplicateUsername(String username) {
        UserMst user = accountRepository.findByUsername(username);
        if(user != null) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("username", "Username already exists");

//            throw new CustomValidationException(errorMap);
        }
    }

    public void comparePassword(String password, String repassword) {
        if(!password.equals(repassword)) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("password", "Password does not match");

//            throw new CustomValidationException(errorMap);
        }
    }
    public UserMst getUser(int userId) {
        return accountRepository.findUserByUserId(userId);
    }
}
