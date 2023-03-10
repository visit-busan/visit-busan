window.onload = () => {
    UserService.getInstance().loadUserList();
    UserService.getInstance().loadRoles();
    UserService.getInstance().loadNames();
    UserService.getInstance().loadSearchNumberList();
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteButton();
    ComponentEvent.getInstance().addClickEventDeleteButtons();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
}


    function onDisplay() {
        $("#modal").show();
    }
    function offDisplay() {
        $("#modal").hide();
    }

let searchObj = {
    page: 1,
    username: "",
    name: "",
    roleName: "",
    searchValue: "",
    order: "username",
    limit: "Y",
    count: 10
}

class UserSearchApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UserSearchApi();
        }

        return this.#instance;
    }

    getUserList(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/users",
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

    getUserTotalCount(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/users/totalcount",
            data: {
                "username": searchObj.username,
                "name": searchObj.name,
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

    getNames() {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/users/names",
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

    deleteUsers(deleteArray) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: "http://localhost:8000/api/admin/users",
            contentType: "application/json",
            data: JSON.stringify(
                { usernames: deleteArray }
            ),
            dataType: "json",
            success: response => {
                returnFlag = true;
            },
            error: error => {
                console.log(error);
            }
        });

        return returnFlag;
    }

}

class UserService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UserService();
        }
        return this.#instance;
    }

    loadUserList() {
        const responseData = UserSearchApi.getInstance().getUserList(searchObj);
        const checkAll = document.querySelector(".delete-checkall");
        checkAll.checked = false;

        const userListBody = document.querySelector(".content-table tbody");
        userListBody.innerHTML = "";

        responseData.forEach((data, index) => {
            userListBody.innerHTML += `
                <tr>
                    <th><input type="checkbox" class="delete-checkbox"></th>
                    <th class="username" value="${data.username}">${data.username}</th>
                    <th value="${data.name}">${data.name}</th>
                    <th value="${data.roleName}">${data.roleName}</th>
                    <th value="">
                        <button class="table-button modification-button" onclick="onDisplay()">권한수정</button>
                        <button type="button" class="table-button delete-buttons">삭제</button>
                    </th>
                </tr>
            `;
        });

        this.loadSearchNumberList();
        ComponentEvent.getInstance().addClickEventDeleteCheckBox();
    }

    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");
        pageController.innerHTML = "";

        const totalCount = UserSearchApi.getInstance().getUserTotalCount(searchObj);
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
        const responseData = UserSearchApi.getInstance().getRoles();

        const roleSelect = document.querySelector(".role-select");
        roleSelect.innerHTML = `<option value="">전체조회</option>`;

        responseData.forEach(data => {
            roleSelect.innerHTML += `
                <option value="">${data.roleName}</option>
            `;
        });
    }

    loadNames() {
        const responseData = UserSearchApi.getInstance().getNames();

        const nameSelect = document.querySelector(".condition-select");
        nameSelect.innerHTML = `
            <option value="">전체조회</option>
            <option value="${searchObj.username}">아이디</option>
            <option value="${searchObj.name}">이름</option>
        `;
    }

    removeUser(deleteArray) {
        let successFlag = UserSearchApi.getInstance().deleteUsers(deleteArray);
        if (successFlag) {
            searchObj.page = 1;
            this.loadUserList();
        }
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
        const nameSelect = document.querySelector(".condition-select");
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {
            searchObj.roleName = roleSelect.value;
            searchObj.name = nameSelect.value;
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            UserService.getInstance().loadUserList();
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
                        const usernames = document.querySelectorAll(".username");
                        deleteArray.push(usernames[index].textContent);
                    }
                });

                UserService.getInstance().removeUser(deleteArray);
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
                        const usernames = document.querySelectorAll(".username");
                        deleteArray.push(usernames[index].textContent);
                    }
                });

                UserService.getInstance().removeUser(deleteArray);
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