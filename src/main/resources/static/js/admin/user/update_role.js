let roleObj = {
    userId: "",
    roleId: "",
    name: "",
    roleName: "",
    createDate: "",
    updateDate: "",
    selectValue: ""
};

function onDisplay() {
    $("#modal").show();
}
function offDisplay() {
    $("#modal").hide();
}


class UpdateUserRolesApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UpdateUserRolesApi();
        }
        return this.#instance;
    }
    
    getUsername(roleObj) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/user/${roleObj.name}`,
            data: roleObj,
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

    searchUser(roleObj) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/users/user`,
            data: roleObj,
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }


    getUserAndRoles(roleObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/user/roles/${roleObj.userId}`,
            data: {
                "userId": roleObj.userId,
                "name": roleObj.name,
                "roleId": roleObj.roleId,
                "roleName": roleObj.roleName,
                "createDate": roleObj.createDate,
                "updateDate": roleObj.updateDate,
                "selectValue": roleObj.selectValue
            },
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }


    getRoles() {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/roles",
            dataType: "json",
            success: response => {
                returnData = response.data;
                console.log(returnData);
                console.log(roleObj.name)
            },
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }

    removeUserRole() {
        let successFlag = false;
        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/user/${roleObj.name}/roles/${roleObj.roleId}`,
            dataType: "json",
            success: response => {
                successFlag = true;
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return successFlag;
    }

    registerRoles() {
        let returnData = null;
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/admin/uesr/${roleObj.userId}/roles`,
            dataType: "json",
            success: response => {
                alert("권한 수정 완료.");
                returnData = response.data
                console.log(returnData)
                location.reload();
            },
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }
}


class UpdateUserRolesService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UpdateUserRolesService();
        }
        return this.#instance;
    }
    
    setRoleObjValues() {
        const modificationRole = document.querySelectorAll(".modification-role");
        UpdateUserRolesApi.getInstance().getUserAndRoles(roleObj);
        roleObj.name = modificationRole[0].value;
        roleObj.roleName = modificationRole[1].value;
        roleObj.roleName = modificationRole[2].value;
        roleObj.roleName = modificationRole[3].value;
    }
    
    
    loadName() {
        const responseData = UpdateUserRolesApi.getInstance().getUsername(roleObj);
        const selectName = document.querySelector(".select-name")
        selectName.innerHTML = `
            <td class="modification-role select-name" value="" disabled>1</td>
        `;

        responseData.forEach(data => {
            selectName.innerHTML += `
                <td class="modification-role select-name" value="${data.name}" disabled>${data.name}</td>
            `;
        })

    }

    loadRoles() {
        const responseData = UpdateUserRolesApi.getInstance().getRoles();

        const updateAdmin = document.querySelector("#updateAdmin");
        updateAdmin.innerHTML = `
        <select id="updateAdmin" class="roles-select modification-role">
            <option value="">선택</option>
            <option value="">없음</option>
        </select>
       
        `;

        responseData.forEach(data => {
            updateAdmin.innerHTML += `
                <select id="updateAdmin" class="roles-select modification-role">
                    <option value="${data.roleId}">${data.roleName}</option>
                </select>
            `;
        });

        const updateWriter = document.querySelector("#updateWriter");
        updateWriter.innerHTML = `
            <select id="updateWriter" class="roles-select modification-role">
                <option value="">선택</option>
                <option value="">없음</option>
            </select>
        `;

        responseData.forEach(data => {
            updateWriter.innerHTML += `
                <select id="updateWriter" class="roles-select modification-role">
                    <option value="${data.roleId}">${data.roleName}</option>
                </select>
            `;
        });
        
        const updateUser = document.querySelector("#updateUser");
        updateUser.innerHTML = `
            <select id="updateUser" class="roles-select modification-role">
                <option value="">선택</option>
                <option value="">없음</option>
            </select>
        `;

        responseData.forEach(data => {
            updateUser.innerHTML += `
                <select id="updateUser" class="roles-select modification-role">
                    <option value="${data.roleId}">${data.roleName}</option>
                </select>
            `;
        });
    }

    loadUserAndUserRoles() {
 
        const modificationName = document.querySelector(".modification-name");
        const modificationButton = document.querySelector(".modification-button");
        
        modificationButton.onclick = () => {
            onDisplay();
            const responseData = UpdateUserRolesApi.getInstance().searchUser(roleObj);
            console.log(roleObj)
            modificationName.innerHTML = `
            <tr class="modification-name">
                <th>사용자 이름</th>
                <td class="modification-role select-name" value="${roleObj.name}" disabled>${roleObj.name}</td>
            </tr>
            `; 

            // responseData.forEach(data => {
            //     modificationName.innerHTML += `        
            //     <td class="modification-role select-name" value="${data.name}" disabled>${data.name}</td>
            //     `;
            // });
        }



        // const nameData = responseData.data[UserMst][1]['name']

        // <td class="modification-role select-name" disabled>${responseData.name}</td>
        // modificationName.innerHTML = `
        //     <tr class="modification-name">
        //         <th>사용자 이름</th>
        //     </tr>
        // `;
        
        // responseData.forEach(data => {
        //     modificationName.innerHTML += `        
        //         <td class="modification-role select-name" value="${data.name}" disabled>${data.name}</td>
        //     `;
        // });

        // rolesSelect.innerHTML = `
        //     <td>
        //         <select id="updateAdmin" class="roles-select modification-role">
        //             <option value="">선택</option>
        //             <option value="">없음</option>
        //         </select>
        //     </td>
        // `;

        // responseData.forEach(data => {
        //     rolesSelect.innerHTML += `
        //         <option value="${data.roleId}">${data.roleName}</option>
        //     `;
        // });
    
        // dateTime.value[0].innerHTML = `
        //     <tr class="date-time">
        //         <th>등록일</th>
        //     </tr>
        // `;
        
        // responseData.forEach(data => {
        //     dateTime.value[0].innerHTML += `        
        //     <td disabled>${data.craeteDate}</td>
        //     `;
        // });

        // dateTime.value[1].innerHTML = `
        //     <tr class="date-time">
        //         <th>수정일</th>
        //     </tr>
        // `;
        
        // responseData.forEach(data => {
        //     dateTime.value[1].innerHTML += `        
        //     <td disabled>${data.updateDate}</td>
        //     `;
        // });
    }


}

class UpdateEvent {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UpdateEvent();
        }
        return this.#instance;
    }

    addClickEventModificationButton() {
        const modificationButton = document.querySelector(".modification-button");

        modificationButton.onclick = () => {
            onDisplay();

            UpdateUserRolesService.getInstance().loadRoles();
            UpdateUserRolesService.getInstance().loadName();

            
        }

    }

    addClickEventUpdateButton() {

    }
    
}