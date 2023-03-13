package com.korit.visitbusan.service.admin;

import com.korit.visitbusan.entity.RoleDtl;
import com.korit.visitbusan.entity.RoleMst;
import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.repository.admin.AdminUserRoleRepository;
import com.korit.visitbusan.web.dto.admin.AdminDeleteUserDto;
import com.korit.visitbusan.web.dto.admin.AdminUserDto;
import com.korit.visitbusan.web.dto.admin.AdminUserRoleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*******************************************
 *** 작성자 : 홍성욱
 *  버전 : V0.1
 *  내용 : 사용자의 권한 수정, 사용자 삭제, 조회 데이터 처리를 위한 Service
 *  작성일 : 2023.03.04
 *******************************************/

@Service
@RequiredArgsConstructor
public class AdminUserRoleService {

    private final AdminUserRoleRepository adminUserRoleRepository;


    public String getUser(UserMst userMst) {

        return userMst.getName();
    }

    public Map<String, Object> findUserByUserId(int userId) {
        Map<String, Object> user = new HashMap<>();

        user.put("UserMst", adminUserRoleRepository.findUserByUserId(userId));
        user.put("roleDtl", adminUserRoleRepository.findUserRoleByUserId(userId));
        return user;
    }

    public int getUserTotalCount(AdminUserRoleDto adminUserRoleDto) {
        return adminUserRoleRepository.getUserTotalCount(adminUserRoleDto);
    }

    public List<UserMst> findUserAndRoles(AdminUserDto adminUserDto) {
        return adminUserRoleRepository.findUserAndRoles(adminUserDto);
    }

    public int getRoleTotalCount(AdminUserRoleDto adminUserRoleDto) {
        return adminUserRoleRepository.getRoleTotalCount(adminUserRoleDto);
    }

    public List<AdminUserRoleDto> searchUser(AdminUserRoleDto adminUserRoleDto) {
        adminUserRoleDto.setIndex();
        return adminUserRoleRepository.searchUser(adminUserRoleDto);
    }

    public List<AdminUserDto> findUsers(AdminUserDto adminUserDto) {
        return adminUserRoleRepository.findUsers(adminUserDto);
    }

    public List<RoleMst> searchRole(AdminUserRoleDto adminUserRoleDto) {
        adminUserRoleDto.setIndex();
        return adminUserRoleRepository.searchRole(adminUserRoleDto);
    }

    public List<AdminUserDto> getRoleName(AdminUserDto adminUserDto) {
        return adminUserRoleRepository.searchRoles(adminUserDto);
    }

    public List<UserMst> getNames() {
            return adminUserRoleRepository.findAllName();
        }

    public AdminUserRoleDto modifyRole(AdminUserRoleDto adminUserRoleDto) {
        return adminUserRoleRepository.maintainUpdateRoleByUsername(adminUserRoleDto);
    }
    public void deleteUserByUsername(String username) {
        adminUserRoleRepository.deleteUserByName(username);
    }

    public void deleteUserByName(String name) {
        adminUserRoleRepository.deleteUserByName(name);
    }

    public void deleteUsers(AdminDeleteUserDto adminDeleteUserDto) {
        adminUserRoleRepository.deleteUsers(adminDeleteUserDto.getUsername());
    }

    public void registerUserRoles(RoleDtl roleDtl) {
        List<RoleDtl> listRoleDtl = new ArrayList<RoleDtl>();
        int roleDtlId = roleDtl.getRoleDtlId();
        int userId = roleDtl.getUserId();
        int roleId = roleDtl.getRoleId();
        RoleMst roleMst = roleDtl.getRoleMst();

        RoleDtl roleDtls = RoleDtl.builder()
                .roleDtlId(roleDtlId)
                .userId(userId)
                .roleId(roleId)
                .roleMst(roleMst)
                .createDate(LocalDateTime.now())
                .updateDate(LocalDateTime.now())
                .build();

        listRoleDtl.add(roleDtls);

        adminUserRoleRepository.registerUserRoles(listRoleDtl);
    }

    public void deleteUserRoles(int userId) {
         adminUserRoleRepository.deleteUserRoles(userId);
    }

}
