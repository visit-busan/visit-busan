package com.korit.visitbusan.repository.admin;


import com.korit.visitbusan.entity.RoleDtl;
import com.korit.visitbusan.entity.RoleMst;
import com.korit.visitbusan.entity.UserMst;
import com.korit.visitbusan.web.dto.admin.AdminUserRoleDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/*******************************************
 *** 작성자 : 홍성욱
 *  버전 : V0.1
 *  내용 :  관리자 페이지 사용자관리 Repository
 *  작성일 : 2023.03.02
 *******************************************/

@Mapper
public interface AdminUserRoleRepository {

    public int getUserTotalCount(AdminUserRoleDto adminUserRoleDto);
    public int getRoleTotalCount(AdminUserRoleDto adminUserRoleDto);
    public List<AdminUserRoleDto> searchUser(AdminUserRoleDto adminUserRoleDto);
    public RoleMst searchRole(AdminUserRoleDto adminUserRoleDto);
    public UserMst findUserByUsername(UserMst username);
    public UserMst findUserByName(String name);
    public UserMst findUserByUserId(int userId);
    public RoleDtl findUserRoleByUserId(int userId);
    public List<RoleMst> findAllRoleName();
    public List<UserMst> findAllName();
    public UserMst updateRoleByUserName(AdminUserRoleDto adminUserRoleDto);
    public AdminUserRoleDto maintainUpdateRoleByUsername(AdminUserRoleDto adminUserRoleDto);
    public UserMst updateRoleByName(AdminUserRoleDto adminUserRoleDto);
    public String deleteUserByUsername(String username);
    public String deleteUserByName(String name);
    public String deleteUsers(List<String> username);
    public int registerUserRoles(List<RoleDtl> roleDtl);
    public int deleteUserRoles(int userId);
}
