package com.korit.visitbusan.security;

import com.korit.visitbusan.entity.RoleDtl;
import com.korit.visitbusan.entity.RoleMst;
import com.korit.visitbusan.entity.UserMst;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@AllArgsConstructor
public class PrincipalDetails implements UserDetails, OAuth2User {

    @Getter
    private final UserMst userMst;
    private Map<String, Object> response;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        List<RoleDtl> roleDtlList = userMst.getRoleDtl();
        for(int i = 0; i < roleDtlList.size(); i++) {
            RoleDtl dtl =  roleDtlList.get(i);
            RoleMst roleMst = dtl.getRoleMst();
            String roleName = roleMst.getRoleName();

            GrantedAuthority role = new GrantedAuthority() {
                @Override
                public String getAuthority() {
                    return roleName;
                }
            };
            authorities.add(role);
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return userMst.getPassword();
    }

    @Override
    public String getUsername() {
        return userMst.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return userMst.getName();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return response;
    }
}
