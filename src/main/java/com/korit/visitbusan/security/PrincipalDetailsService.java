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

    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserMst usermst = accountRepository.findByUsername(username);

        if (usermst == null) {
            //customException
        }

        return new PrincipalDetails(usermst);
    }
}
