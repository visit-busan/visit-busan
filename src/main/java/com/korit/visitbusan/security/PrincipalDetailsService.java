package com.korit.visitbusan.security;

import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
/*******************************************
 *** 작성자 : 이성욱
 *  버전 : V0.1
 *  내용 :  회원가입 관련기능 principal service
 *  작성일 : 2023.03.09
 *******************************************/
@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserMst usermst = accountRepository.findByUsername(username);
        if (usermst == null) {
            throw new UsernameNotFoundException("회원정보를 확인 할 수 없습니다");
        }

        return new PrincipalDetails(usermst);
    }
}
