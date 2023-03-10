package com.korit.visitbusan.repository;

import com.korit.visitbusan.entity.UserMst;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {

    public UserMst findUserByUserId(int userId);
    public UserMst findByUsername (String username);

    public UserMst findUsername(String name, String tellNumber);
    public UserMst findPassword(String username, String name, String tellNumber);
    public int changePassword(String password,String username, String name, String tellNumber);

    public int saveUser(UserMst user);
    public int saveRole(UserMst user);
    public int setUserProvider(UserMst user);
//    public int deleteUser(int userId);
    public int deleteUser(int userId);
}
