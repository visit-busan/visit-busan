package com.korit.visitbusan.config;

import com.korit.visitbusan.security.PrincipalOAuth2DetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
/*******************************************
 *** 작성자 : 정순동, 이성욱
 *  버전 : V0.1
 *  내용 :  Security 관련 설정 configuration
 *  최근작성일 : 2023.03.09
 *******************************************/
@EnableWebSecurity
@Configurable
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    private final PrincipalOAuth2DetailsService principalOauth2DetailsService;
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.authorizeRequests()
                .antMatchers("/mypage/**", "/security/**", "/write" , "/api/account/delete/**")
                .authenticated()
                .antMatchers("/admin/**")
                .hasRole("ADMIN")
                .antMatchers("/post/modify/**")
                .hasRole("WRITER")
                .antMatchers("/post/register/**")
                .hasRole("WRITER")
                .anyRequest()
                .permitAll()
                .and()
                .formLogin()
                .loginPage("/account/login")
                .loginProcessingUrl("/account/login")
                .successForwardUrl("/index")
                .failureForwardUrl("/account/login/error")
                .defaultSuccessUrl("/index")
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(principalOauth2DetailsService)

                .and()
                .defaultSuccessUrl("/index");


    }
}
