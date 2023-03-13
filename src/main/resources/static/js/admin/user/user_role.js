window.onload = () => {
    RoleService.getInstance().loadUserList();
    RoleService.getInstance().loadRoles();
    RoleService.getInstance().loadNames();
    RoleService.getInstance().loadSearchNumberList();
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteButton();
    ComponentEvent.getInstance().addClickEventDeleteButtons();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
}

let searchObj = {
    page: 1,
    roleName: "",
    roleId: "",
    searchValue: "",
    order: "roleId",
    limit: "Y",
    count: 10
}

class RoleSearchApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new RoleSearchApi();
        }

        return this.#instance;
    }

    getRoleList(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/roles",
            data: searchObj,
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

    getRoleTotalCount(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/roles/totalcount",
            data: {
                "roleName": searchObj.roleName,
                "searchValue": searchObj.searchValue
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

}

class RoleService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new RoleService();
        }

        return this.#instance;
    }

    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");
        pageController.innerHTML = "";

        const totalCount = RoleSearchApi.getInstance().getUserTotalCount(searchObj);
        const maxPageNumber = totalCount % searchObj.count == 0
            ? Math.floor(totalCount / searchObj.count)
            : Math.floor(totalCount / searchObj.count) + 1;

        pageController.innerHTML += `
        <a href="javascript:void(0)" class="pre-button disabled">이전</a>
        <ul class="page-numbers"></ul>
        <a href="javascript:void(0)" class="next-button disabled">다음</a>
        `;

        if (searchObj.page != 1) {
            const preButton = pageController.querySelector(".pre-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page--;

                this.loadUserList();
            }
        }

        if (searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;

                this.loadUserList();
            }
        }

        const startIndex = searchObj.page % 5 == 0 ?
            searchObj.page - 4
            : searchObj.page - (searchObj.page % 5) + 1;

        const endIndex = startIndex + 4 <= maxPageNumber ?
            startIndex + 4 : maxPageNumber;

        const pageNumber = document.querySelector(".page-numbers");
        for (let i = startIndex; i <= endIndex; i++) {
            pageNumber.innerHTML += `
                <a href="javascript:void(0)" class="page-button ${i == searchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {
            const pageNumber = button.textContent;
            if (pageNumber != searchObj.page) {
                button.onclick = () => {
                    searchObj.page = pageNumber;
                    this.loadUserList();
                }
            }
        });
    }

    loadRoles() {
        const responseData = RoleSearchApi.getInstance().getRoles();

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

    addClickEventSearchButton() {
        const roleSelect = document.querySelector(".role-select");
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {
            searchObj.roleName = roleSelect.value;
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            RoleService.getInstance().loadUserList();
        }

        searchInput.onkeyup = () => {
            if (window.event.keyCode == 13) {
                searchButton.click();
            }
        }

    }

    addClickEventDeleteButton() {
        const deleteButton = document.querySelector(".delete-button");
        deleteButton.onclick = () => {
            if (confirm("정말로 삭제하시겠습니까?")) {
                const deleteArray = new Array();

                const deleteCheckBox = document.querySelectorAll(".delete-checkbox");
                deleteCheckBox.forEach((deleteCheckbox, index) => {
                    if (deleteCheckbox.checked) {
                        const usernames = document.querySelectorAll(".roleId");
                        deleteArray.push(usernames[index].textContent);
                    }
                });

                RoleService.getInstance().removeUser(deleteArray);
            }
        }
    }

    addClickEventDeleteButtons() {
        const deleteButton = document.querySelector(".delete-buttons");
        deleteButton.onclick = () => {
            if (confirm("정말로 삭제하시겠습니까?")) {
                const deleteArray = new Array();

                const deleteCheckBox = document.querySelectorAll(".delete-checkbox");
                deleteCheckBox.forEach((deleteCheckbox, index) => {
                    if (deleteCheckbox.checked) {
                        const usernames = document.querySelectorAll(".roleId");
                        deleteArray.push(usernames[index].textContent);
                    }
                });

                RoleService.getInstance().removeUser(deleteArray);
            }
        }
    }

    addClickEventDeleteCheckAll() {
        const checkAll = document.querySelector(".delete-checkall");

        checkAll.onclick = () => {
            const deleteCheckBox = document.querySelectorAll(".delete-checkbox");
            deleteCheckBox.forEach(deleteCheckBox => {
                deleteCheckBox.checked = checkAll.checked;
            });
        }
    }

    addClickEventDeleteCheckBox() {
        const deleteCheckBoxs = document.querySelectorAll(".delete-checkbox");
        const checkAll = document.querySelector(".delete-checkall");

        deleteCheckBoxs.forEach(deleteCheckBox => {
            deleteCheckBox.onclick = () => {
                const deleteCheckedCheckBoxs = document.querySelectorAll(".delete-checkbox:checked");

                console.log("선택" + deleteCheckedCheckBoxs.length);
                console.log("전체" + deleteCheckBoxs.length);

                if (deleteCheckedCheckBoxs.length == deleteCheckBoxs.length) {
                    checkAll.checked = true;
                } else {
                    checkAll.checked = false;
                }
            }
        });
    }
}