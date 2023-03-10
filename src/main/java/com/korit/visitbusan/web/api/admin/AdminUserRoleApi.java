package com.korit.visitbusan.web.api.admin;


import com.korit.visitbusan.aop.annotation.ParamsAspect;
import com.korit.visitbusan.aop.annotation.ValidAspect;
import com.korit.visitbusan.entity.RoleDtl;
import com.korit.visitbusan.entity.RoleMst;
import com.korit.visitbusan.service.admin.AdminUserRoleService;
import com.korit.visitbusan.web.dto.CMRespDto;
import com.korit.visitbusan.web.dto.admin.AdminDeleteUserDto;
import com.korit.visitbusan.web.dto.admin.AdminUserRoleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUserRoleApi {

    private final AdminUserRoleService adminUserRoleService;

    @GetMapping("/user/{name}")
    public ResponseEntity<CMRespDto<Map<String, Object>>> getUser(@PathVariable String name) {
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminUserRoleService.getUser(name)));
    }

    @GetMapping("/user/roles/{userId}")
    public ResponseEntity<CMRespDto<Map<String, Object>>> getUserAndRoles(@PathVariable int userId) {
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminUserRoleService.getUserAndUserRoles(userId)));
    }


    // 유저찾기
    @ParamsAspect
    @ValidAspect
    @GetMapping("/users")
    public ResponseEntity<CMRespDto<List<AdminUserRoleDto>>> searchUser(@Valid AdminUserRoleDto adminUserRoleDto, BindingResult bindingResult) {
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminUserRoleService.searchUser(adminUserRoleDto)));
    }

    @ParamsAspect
    @ValidAspect
    @GetMapping("/roles")
    public ResponseEntity<CMRespDto<RoleMst>> searchRole(@Valid AdminUserRoleDto adminUserRoleDto, BindingResult bindingResult) {
        System.out.println(adminUserRoleDto);
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminUserRoleService.searchRole(adminUserRoleDto)));
    }


    @GetMapping("/users/totalcount")
    public ResponseEntity<CMRespDto<?>> getUserTotalCount(@Valid AdminUserRoleDto adminUserRoleDto) {
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminUserRoleService.getUserTotalCount(adminUserRoleDto)));
    }

    @GetMapping("/roles/totalcount")
    public ResponseEntity<CMRespDto<?>> getRoleTotalCount(@Valid AdminUserRoleDto adminUserRoleDto) {
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminUserRoleService.getRoleTotalCount(adminUserRoleDto)));
    }

    @GetMapping("/roles/rolenames")
    public ResponseEntity<CMRespDto<?>> getRoleNames() {
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminUserRoleService.getRoleName()));
    }

    @GetMapping("/users/names")
    public ResponseEntity<CMRespDto<?>> getNames() {
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", adminUserRoleService.getNames()));
    }

    @ParamsAspect
    @ValidAspect
    @PutMapping("/users/{username}")
    public ResponseEntity<CMRespDto<?>> modifyRole(@PathVariable String username, AdminUserRoleDto adminUserRoleDto, BindingResult bindingResult) {
        adminUserRoleService.modifyRole(adminUserRoleDto);

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @DeleteMapping("/users/{username}")
    public ResponseEntity<CMRespDto<?>> removeUserByUsername(@PathVariable String username) {
        adminUserRoleService.deleteUserByUsername(username);
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @DeleteMapping("/users/{name}")
    public ResponseEntity<CMRespDto<?>> removeUserByName(@PathVariable String name) {
        adminUserRoleService.deleteUserByName(name);
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @DeleteMapping("/users")
    public ResponseEntity<CMRespDto<?>> removeUsers(@PathVariable AdminDeleteUserDto adminDeleteUserDto) {
        adminUserRoleService.deleteUsers(adminDeleteUserDto);
        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }

    @ParamsAspect
    @PostMapping("/user/{userId}/roles")
    public ResponseEntity<CMRespDto<?>> modifyUserRole(@PathVariable RoleDtl userId) {
        adminUserRoleService.registerUserRoles(userId);

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", true));
    }


    @DeleteMapping("/user/{userId}/roles/{roleDtlId}")
    public ResponseEntity<CMRespDto<?>> removeUserRoles(@PathVariable int userId, @PathVariable int roleDtlId) {

        adminUserRoleService.deleteUserRoles(userId);

        return ResponseEntity.ok()
                .body(new CMRespDto<>(HttpStatus.OK.value(), "Successfully", null));
    }
}
