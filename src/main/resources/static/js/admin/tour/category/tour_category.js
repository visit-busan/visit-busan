window.onload = () => {
    CategoryService.getInstance().loadCategoryList();
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteAll();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
    ComponentEvent.getInstance().addClickEventRegisterButton();
    ComponentEvent.getInstance().addClickEventModalRegisterButton();
    ComponentEvent.getInstance().addClickEventModalCancelButton();
    ComponentEvent.getInstance().addClickEventModifyButton();
    ComponentEvent.getInstance().addClickEventModalModifyButton();
}

const searchObj = {
    page: 1,
    searchValue : "",
    limit: "Y",
    count: 20
}

const categoryObj = {
    categoryId: "",
    categoryName: "",
    userId: "",
    createDate: "",
    updateDate: "",
}

const principalData = PrincipalApi.getInstance().getPrincipal();

class CategoryApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CategoryApi();
        }
        return this.#instance;
    }

    getCategoryTotalCount(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/category/totalcount",
            data: {
                "searchValue" : searchObj.searchValue
            },
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return returnData;
    }

    getCategoryList(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/categories",
            data: searchObj,
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return returnData;
    }

    registerCategory() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://127.0.0.1:8000/api/admin/category",
            contentType: "application/json",
            data: JSON.stringify(categoryObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
                CategoryService.getInstance().setRegisterErrors(error.responseJSON.data);
            }

        });

        return successFlag;
    }

    modifyCategory() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "put",
            url: `http://localhost:8000/api/admin/category/${categoryObj.categoryId}`,
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
                CategoryService.getInstance().setModifyErrors(error.responseJSON.data);
            }
        })

        return successFlag;
    }

    deleteCategory() {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/category/${categoryId}`,
            dataType: "json",
            success: response => {
                returnFlag = true;
            },
            error: error => {
                console.log(error);
            }
        })

        return returnFlag;
    }

    deleteCategories(deleteArray) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/categories`,
            contentType: "application/json",
            data: JSON.stringify(
                {
                    categoryIds: deleteArray
                }
            ),
            dataType: "json",
            success: response => {
                returnFlag = true;
            },
            error: error => {
                console.log(error);
            }
        })

        return returnFlag;
    }
}

class CategoryService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new CategoryService();
        }
        return this.#instance;
    }

    loadCategoryList() {
        const responseData = CategoryApi.getInstance().getCategoryList(searchObj);
        const checkAll = document.querySelector(".delete-checkall");
        checkAll.checked = false;

        const categoryListBody = document.querySelector(".content-table tbody");
        categoryListBody.innerHTML = "";

        responseData.forEach((data, index) => {
            categoryListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="category-id">${data.categoryId}</td>
                    <td>${data.categoryName}</td>
                    <td>${data.username}</td>
                    <td>${data.createDate}</td>
                    <td>
                        <div class="manage-button">
                            <div class="modify-button"><i class="fa-solid fa-pen-to-square"></i></div>
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </td>
                </tr>
            `;
        });

        this.loadCategoryNumberList();
        ComponentEvent.getInstance().addClickEventDeleteCheckbox();
    }

    loadModifyCategoryList() {
        const responseData = CategoryApi.getInstance().getCategoryList(searchObj);

        if(responseData == null) {
            alert("?????? ???????????? ????????? ???????????? ?????? ???????????????.")
            history.back();
            return;
        }

        const modalModifyCategory = document.querySelectorAll(".modify-category");
        modalModifyCategory[0].value = responseData.categoryId;
        modalModifyCategory[1].value = responseData.categoryName;
        modalModifyCategory[0].value = responseData.username;
        modalModifyCategory[0].value = responseData.createDate;
        modalModifyCategory[0].value = responseData.updateDate;
    }

    setCategoryRegisterValues() {
        const registerCategoryInputs = document.querySelectorAll(".modal-form-register input");
        // console.log(registerCategoryInputs[0].value);
        // console.log(principalData.user.userId);
        categoryObj.userId = principalData.user.userId;
        categoryObj.categoryName = registerCategoryInputs[0].value;
    }

    setRegisterErrors(errors) {
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearErrors();

        Object.keys(errors).forEach(key => {
            if(key == "categoryName") {
                errorMessages[1].innerHTML = errors[key];
            }
        })
    }

    clearRegisterErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.innerHTML = "";
        })
    }

    setCategoryModifyCode() {
        const URLSearch = new URLSearchParams(location.search);
        categoryObj.categoryId = URLSearch.get("categoryId");
    }

    setCategoryModifyValues() {
        const responseData = CategoryApi.getInstance().getCategoryList(searchObj);
        const modifyCategoryInputs = document.querySelectorAll(".modal-form-modify input");
        // console.log(registerCategoryInputs[0].value);
        // console.log(responseData.createDate);
        // console.log(principalData.user.userId);
        categoryObj.userId = principalData.user.userId;
        categoryObj.categoryName = modifyCategoryInputs[0].value;
        categoryObj.createDate = responseData.createDate;
    }

    setModifyErrors(errors) {
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearErrors();

        Object.keys(errors).forEach(key => {
            if(key == "categoryName") {
                errorMessages[1].innerHTML = errors[key];
            }
        })
    }

    clearModifyErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.innerHTML = "";
        })
    }


    loadCategoryNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalCount = CategoryApi.getInstance().getCategoryTotalCount(searchObj);
        const maxPageNumber = totalCount % searchObj.count == 0 
                            ? Math.floor(totalCount / searchObj.count) 
                            : Math.floor(totalCount / searchObj.count) + 1;

        pageController.innerHTML = `
            <a href="javascript:void(0)" class="pre-button disabled">??????</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">??????</a>
        `;

        if(searchObj.page != 1) {
            const preButton = pageController.querySelector(".pre-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page--;
                this.loadBookList();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;
                this.loadBookList();
            }
        }

        const startIndex = searchObj.page % 5 == 0 
                        ? searchObj.page - 4 
                        : searchObj.page - (searchObj.page % 5) + 1;
        const endIndex = startIndex + 4 <= maxPageNumber ? startIndex + 4 : maxPageNumber;
        const pageNumbers = document.querySelector(".page-numbers");

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.innerHTML += `
                <a href="javascript:void(0)"class="page-button ${i == searchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {

            const pageNumber = button.textContent;
            if(pageNumber != searchObj.page) {
                button.onclick = () => {
                    searchObj.page = pageNumber;
                    this.loadBookList();
                }
            }
        });
    }

    removeCategory(categoryId) {
        let successFlag = CategoryApi.getInstance().deleteCategory(categoryId);
        if(successFlag) {
            searchObj.page = 1;
            this.loadCategoryList();
        }
    }

    removeCategories(deleteArray) {
        let successFlag = CategoryApi.getInstance().deleteCategories(deleteArray);
        if(successFlag) {
            searchObj.page = 1;
            this.loadCategoryList();
        }
    }
}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventSearchButton() {
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            CategoryService.getInstance().loadCategoryList();
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }

    addClickEventRegisterButton() {
        const registerButton = document.querySelector(".register-button");
        const modal = document.querySelector("#modal");
        const modalRegisterWindow = document.querySelector(".modal-window-register");

        registerButton.onclick = () => {
            modal.style.display = "flex";
            modalRegisterWindow.style.display = "block";
        }
    }

    addClickEventModalRegisterButton() {
        const modalRegisterInput = document.querySelector(".modal-form-register input");
        const modalRegisterButton = document.querySelector(".modal-register-button");

        modalRegisterButton.onclick = () => {
            CategoryService.getInstance().setCategoryRegisterValues();
            const successFlag = CategoryApi.getInstance().registerCategory();

            if(!successFlag) {
                return;
            }

            CategoryService.getInstance().clearRegisterErrors();
            location.reload();
        }

        modalRegisterInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                modalRegisterButton.click();
            }
        }

    }

    addClickEventModalCancelButton() {
        const modalCancelButton = document.querySelector(".close-button");
        const modalcancelButton = document.querySelector(".modal-cancel-button");

        modalcancelButton.onclick = () => {
            location.reload();

        }

        modalCancelButton.onclick = () => {
            location.reload();
        }
    }

    addClickEventModifyButton() {
        const modifyButton = document.querySelector(".modify-button");
        const modal = document.querySelector("#modal");
        const modalModifyWindow = document.querySelector(".modal-window-modify");

        modifyButton.onclick = () => {
            modal.style.display = "flex";
            modalModifyWindow.style.display = "block";
            CategoryService.getInstance().loadModifyCategoryList();
        }
    }

    addClickEventModalModifyButton() {
        const modalModifyButton = document.querySelector(".modal-modify-button");

        modalModifyButton.onclick = () => {
            CategoryService.getInstance().setCategoryModifyValues();
            const successFlag = CategoryApi.getInstance().modifyCategory();

            if(!successFlag) {
                return;
            }

            CategoryService.getInstance().clearModifyErrors();
            location.reload();

        }
    }

    addClickEventDeleteOne() {
        const deleteOne = document.querySelector(".delete-one");
    }

    addClickEventDeleteAll(){
        const deleteAll = document.querySelector(".delete-all");
        deleteAll.onclick = () => {
            if(confirm("????????? ?????????????????????????")) {
                const deleteArray = new Array();

                const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");

                deleteCheckboxs.forEach((deleteCheckbox, index) => {
                    if(deleteCheckbox.checked) {
                        const categoryIds = document.querySelectorAll(".category-id");
                        deleteArray.push(categoryIds[index].textContent);
                    }
                });

                CategoryApi.getInstance().deleteCategories(deleteArray);
            }
            location.reload();
        }
    }

    addClickEventDeleteCheckAll() {
        const checkAll = document.querySelector(".delete-checkall");
        checkAll.onclick = () => {
            const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");
            deleteCheckboxs.forEach(deleteCheckbox => {
                deleteCheckbox.checked = checkAll.checked;
            });
        }
    }

    addClickEventDeleteCheckbox() {
        const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");
        const checkAll = document.querySelector(".delete-checkall");

        deleteCheckboxs.forEach(deleteCheckbox => {
            deleteCheckbox.onclick = () => {
                const deleteCheckedCheckboxs = document.querySelectorAll(".delete-checkbox:checked");
                console.log("?????? : " + deleteCheckedCheckboxs.length);
                console.log("?????? : " + deleteCheckboxs.length);

                if(deleteCheckedCheckboxs.length == deleteCheckboxs.length){
                    checkAll.checked = true;
                }else {
                    checkAll.checked = false;
                }
            }
        });
    }
}