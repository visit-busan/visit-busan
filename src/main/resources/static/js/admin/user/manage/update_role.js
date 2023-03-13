
let roleObj = {
    roleDtlId: "",
    userId: "",
    roleId: "",
    name: "",
    roleName: "",
    craeteDate: "",
    updateDate: ""
};


class UpdateUserRolesApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UpdateUserRolesApi();
        }
        return this.#instance;
    }

    getUserAndUserRoles() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/user/${roleObj.userId}`,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

    getUser() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/user/${roleObj.name}`,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

    getRoles() {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/roles/rolenames",
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

    removeUserRole() {
        let successFlag = false;
        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/user/${roleObj.name}/roles`,
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
            }
        });

        return successFlag;
    }

    registerRoles() {

        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/admin/uesr/${roleObj.userId}/roles`,
            dataType: "json",
            success: response => {
                alert("권한 수정 완료.");
                location.reload();
            },
            error: error => {
                console.log(error);
            }
        });
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


    setName() {
        const URLSearch = new URLSearchParams(location.search);
        roleObj.name = URLSearch.get("name");
    }

    setRoleObjValues() {
        const modificationRole = document.querySelectorAll(".modification-role");

        roleObj.name = modificationRole[0].value;
        roleObj.updateAdmin = modificationRole[1].value;
        roleObj.updateWriter = modificationRole[2].value;
        roleObj.updateUser = modificationRole[3].value;
    }


    loadUserAndUserRolesData() {
        const responseData = UpdateUserRolesApi.getInstance().getUserAndUserRoles();
        const modificationRole = document.querySelectorAll(".modification-role");

        // bookMst가 null이라면 이전으로 돌아가라
        if (responseData.roleDtl == null) {
            alert("해당 사용자는 등록되지 않은 사용자입니다.")
            history.back();
            return;
        }

        modificationRole[0].value = responseData.roleDtl.name;
        modificationRole[1].value = responseData.roleDtl.updateAdmin;
        modificationRole[2].value = responseData.roleDtl.updateWriter;
        modificationRole[3].value = responseData.roleDtl.updateUser;

       
    }

    loadRoles() {
        const responseData = UpdateUserRolesApi.getInstance().getRoles();

        const roleSelect = document.querySelector(".role-select");
        roleSelect.innerHTML = `<option value="">전체조회</option>`;

        responseData.forEach(data => {
            roleSelect.innerHTML += `
                <option value="">${data.roleName}</option>
            `;
        });
    }


}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventModificationButton() {
        const updateButton = document.querySelector(".update-button");

        updateButton.onclick = () => {
            UpdateUserRolesService.getInstance().loadUserAndUserRolesData();
            const successFlag = UpdateUserRolesApi.getInstance().getUserAndUserRoles();
            // 이게 true를 가져온다

            if (!successFlag) { // successFlag가 true가아니면 onclick메소드를 빠져나가라
                return;
            }

            BookModificationService.getInstance().clearErrors();

            if (confirm("도서 이미지를 수정하시겟습니까?")) {
                const imgAddButton = document.querySelector(".img-add-button");
                const imgCancelButton = document.querySelector(".img-cancel-button");

                imgAddButton.disabled = false;
                imgCancelButton.disabled = false;
            } else {
                location.reload();
                // reload() = 새로고침(f5같은)
            }
        }

    }



    addClickEventUpdateButton() {
        const updateButton = document.querySelector(".update-button");

        updateButton.onclick = () => {

            let successFlag = true;

            
        }
    }
    
}