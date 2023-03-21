package com.korit.visitbusan.repository;

import com.korit.visitbusan.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
/*******************************************
 *** 작성자 : 이성욱
 *  버전 : V0.1
 *  내용 :  회원정보를 CRUD 하기 위한 Repository
 *  작성일 : 2023.03.09
 *******************************************/
public interface AccountRepository {

    public UserMst findUserByUserId(int userId);
    public UserMst findByUsername (String username);

    public UserMst findUsername(String name, String tellNumber);
    public UserMst findPassword(String username, String name, String tellNumber);
    public int changePassword(String password,String username, String name, String tellNumber);

    public int saveUser(UserMst user);
    public int saveRole(UserMst user);
    public int setUserProvider(UserMst user);
    public int updateProfile(int userId, String name, String tellNumber, String email);
    public int deleteUser(int userId);
}
