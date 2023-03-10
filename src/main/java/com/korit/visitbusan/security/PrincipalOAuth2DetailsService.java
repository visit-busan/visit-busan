package com.korit.visitbusan.security;


import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
/*******************************************
 *** 작성자 : 이성욱
 *  버전 : V0.1
 *  내용 :  구글 회원가입 관련기능 principal service
 *  작성일 : 2023.03.09
 *******************************************/
@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOAuth2DetailsService extends DefaultOAuth2UserService {

    private final AccountRepository accountRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User =super.loadUser(userRequest);
        PrincipalDetails principalDetails = null;

        System.out.println("ClientRegistration : " + userRequest.getClientRegistration());
        System.out.println("Attributes : " + oAuth2User.getAttributes());

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        String username = email.substring(0, email.indexOf("@"));
        String provider = userRequest.getClientRegistration().getClientName();
        UserMst userMst = accountRepository.findByUsername(username);

        if (userMst == null) {
            String name = (String)attributes.get("name");
            String password = new BCryptPasswordEncoder().encode(UUID.randomUUID().toString());

            userMst = UserMst.builder()
                    .username(username)
                    .password(password)
                    .name(name)
                    .email(email)
                    .provider(provider)
                    .build();

            accountRepository.saveUser(userMst);
            accountRepository.saveRole(userMst);
            userMst = accountRepository.findByUsername(username);
        } else if (userMst.getProvider() == null) {

            userMst.setProvider(provider);
            accountRepository.setUserProvider(userMst);
        }

        principalDetails = new PrincipalDetails(userMst, attributes);

        return principalDetails;
    }
}
