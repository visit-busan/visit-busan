package com.korit.visitbusan.security;

import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        UserMst usermst = accountRepository.findByUsername(username);
        System.out.println(usermst);
        if (usermst == null) {
            throw new UsernameNotFoundException("회원정보를 확인 할 수 없습니다"); //예외처리
        }

        return new PrincipalDetails(usermst);
    }
}
