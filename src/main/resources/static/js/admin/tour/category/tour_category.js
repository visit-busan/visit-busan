window.onload = () => {
    CategoryService.getInstance().loadCategoryList();
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteAll();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
    ComponentEvent.getInstance().addClickEventRegisterButton();
    ComponentEvent.getInstance().addClickEventModalRegisterButton();
    ComponentEvent.getInstance().addClickEventModalRegisterCancelButton();
    ComponentEvent.getInstance().addClickEventModifyButton();
    ComponentEvent.getInstance().addClickEventModalModifyButton();
    ComponentEvent.getInstance().addClickEventModalModifyCancelButton();
    ComponentEvent.getInstance().addClickEventDeleteOne();
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

// 현재시간을 가져오는 Date 객체 생성
const now = new Date();

// 각 요소별로 날짜와 시간을 추출
let year = now.getFullYear();
let month = now.getMonth() + 1;
let day = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let second = now.getSeconds();

// 월, 일, 시, 분, 초의 자릿수가 1자리면 앞에 0을 추가
if (month < 10) {month = "0" + month};
if (day < 10) {day = "0" + day};
if (hour < 10) {hour = "0" + hour};
if (minute < 10) {minute = "0" + minute};
if (second < 10) {second = "0" + second};

// 날짜와 시간을 문자열로 합쳐서 "yyyy-MM-dd HH:mm:ss" pattern에 맞게 출력
let formattedDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;


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
            url: "http://localhost:8000/api/admin/category",
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

    getCategoryListByCategoryId(categoryId) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/category/${categoryId}`,
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

    modifyCategory(categoryId) {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "put",
            url: `http://localhost:8000/api/admin/category/${categoryId}`,
            contentType: "application/json",
            data: JSON.stringify(categoryObj),
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

    deleteCategory(categoryId) {
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

        // console.log(responseData);

        responseData.forEach((data, index) => {
            categoryListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="category-id">${data.categoryId}</td>
                    <td>${data.categoryName}</td>
                    <td>${data.username}</td>
                    <td>${data.updateDate}</td>
                    <td>
                        <div class="manage-button">
                            <div class="modify-button"><i class="fa-solid fa-pen-to-square"></i></div>
                            <div class="delete-one"><i class="fa-solid fa-trash-can"></i></div>
                        </div>
                    </td>
                </tr>
            `;
        });

        this.loadCategoryNumberList();
        ComponentEvent.getInstance().addClickEventDeleteCheckbox();
    }

    loadModifyCategoryList(categoryId) {
        const responseData = CategoryApi.getInstance().getCategoryListByCategoryId(categoryId);
        const modalModifyCategory = document.querySelectorAll(".modify-category");
        // console.log(responseData);
        modalModifyCategory[0].textContent = responseData.categoryId;
        modalModifyCategory[1].value = responseData.categoryName;
        modalModifyCategory[2].value = responseData.username;
        modalModifyCategory[3].textContent = responseData.createDate;
        modalModifyCategory[4].textContent = responseData.updateDate;
    }

    setCategoryRegisterValues() {
        const registerCategoryInputs = document.querySelectorAll(".modal-form-register input");
        // console.log(registerCategoryInputs[0].value);
        // console.log(principalData.user.userId);
        categoryObj.userId = principalData.userMst.userId;
        categoryObj.categoryName = registerCategoryInputs[0].value;
    }

    setRegisterErrors(errors) {
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearRegisterErrors();

        Object.keys(errors).forEach(key => {
            if(key == "categoryName") {
                errorMessages[0].innerHTML = errors[key];
            }
        })
    }

    clearRegisterErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.innerHTML = "";
        })
    }

    setCategoryModifyValues() {
        const modifyCategoryInputs = document.querySelectorAll(".modify-category");
        // console.log(modifyCategoryInputs[0].value);
        // console.log(responseData.updateDate);
        // console.log(principalData.userMst.userId);
        categoryObj.categoryId = modifyCategoryInputs[0].textContent;
        categoryObj.categoryName = modifyCategoryInputs[1].value;
        categoryObj.updateDate = formattedDate;
        categoryObj.userId = principalData.userMst.userId;
    }

    setModifyErrors(errors) {
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearModifyErrors();

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

    loadCategoryNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalCount = CategoryApi.getInstance().getCategoryTotalCount(searchObj);
        const maxPageNumber = totalCount % searchObj.count == 0 
                            ? Math.floor(totalCount / searchObj.count) 
                            : Math.floor(totalCount / searchObj.count) + 1;

        pageController.innerHTML = `
            <a href="javascript:void(0)" class="pre-button disabled">이전</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">다음</a>
        `;

        if(searchObj.page != 1) {
            const preButton = pageController.querySelector(".pre-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page--;
                this.loadCategoryList();
                ComponentEvent.getInstance().addClickEventDeleteOne();
                ComponentEvent.getInstance().addClickEventModifyButton();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;
                this.loadCategoryList();
                ComponentEvent.getInstance().addClickEventDeleteOne();
                ComponentEvent.getInstance().addClickEventModifyButton();
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
                    this.loadCategoryList();
                    ComponentEvent.getInstance().addClickEventDeleteOne();
                    ComponentEvent.getInstance().addClickEventModifyButton();
                }
            }
        });
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
        // console.log(modalRegisterInput);

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

    addClickEventModalRegisterCancelButton() {
        const modal = document.querySelector("#modal");
        const modalRegisterWindow = document.querySelector(".modal-window-register");
        const modalCloseButton = document.querySelector(".modal-window-register .close-button");
        const modalCancelButton = document.querySelector(".modal-window-register .modal-cancel-button");

        modalCancelButton.onclick = () => {
            modal.style.display = "none";
        }

        modalCloseButton.onclick = () => {
            modal.style.display = "none";
        }

        modalRegisterWindow.onkeyup = () => {
            if(window.event.keyCode == 27) {
                modal.style.display = "none";
            }
        }
    }

    addClickEventModifyButton() {
        const modifyButtons = document.querySelectorAll(".modify-button");
        const categoryIds = document.querySelectorAll(".category-id");
        const modal = document.querySelector("#modal");
        const modalModifyWindow = document.querySelector(".modal-window-modify");

        modifyButtons.forEach((modifyButton, index) => {
            modifyButton.onclick = () => {
                const categoryData = CategoryApi.getInstance().getCategoryListByCategoryId(categoryIds[index].textContent)
                // console.log(categoryIds[index].textContent);
                // console.log(categoryData);
                modal.style.display = "flex";
                modalModifyWindow.style.display = "block";
                CategoryService.getInstance().loadModifyCategoryList(categoryIds[index].textContent);
            }
        })
    }

    addClickEventModalModifyButton() {
        const modalModifyInput = document.querySelectorAll(".modal-form-modify input");
        const modalModifyButton = document.querySelector(".modal-modify-button");
        const categoryContents = document.querySelectorAll(".modify-category");

        modalModifyButton.onclick = () => {
            // console.log(categoryContents[0].textContent);
            CategoryService.getInstance().setCategoryModifyValues();
            const successFlag = CategoryApi.getInstance().modifyCategory(categoryContents[0].textContent);

            if(!successFlag) {
                return;
            }

            CategoryService.getInstance().clearModifyErrors();
            location.reload();
        }

        modalModifyInput[0].onkeyup = () => {
            if(window.event.keyCode == 13) {
                modalModifyButton.click();
            }
        }
    }

    addClickEventModalModifyCancelButton() {
        const modal = document.querySelector("#modal");
        const modalModifyWindow = document.querySelector(".modal-window-modify");
        const modalCloseButton = document.querySelector(".modal-window-modify .close-button");
        const modalCancelButton = document.querySelector(".modal-window-modify .modal-cancel-button");

        modalCloseButton.onclick = () => {
            modal.style.display = "none";
        }

        modalCancelButton.onclick = () => {
            modal.style.display = "none";
        }

        modalModifyWindow.onkeyup = () => {
            if(window.event.keyCode == 27) {
                modal.style.display = "none";
            }
        }
    }

    addClickEventDeleteOne() {
        const deleteOne = document.querySelectorAll(".delete-one");
        const categoryIds = document.querySelectorAll(".category-id");

        deleteOne.forEach((button, index) => {
            button.onclick = () => {
                if(confirm("정말로 삭제하시겠습니까?")){
                    CategoryApi.getInstance().deleteCategory(categoryIds[index].textContent);
                }
                location.reload();
            }
        })
    }

    addClickEventDeleteAll(){
        const deleteAll = document.querySelector(".delete-all");
        deleteAll.onclick = () => {
            if(confirm("정말로 삭제하시겠습니까?")) {
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
                console.log("전체 : " + deleteCheckedCheckboxs.length);
                console.log("선택 : " + deleteCheckboxs.length);

                if(deleteCheckedCheckboxs.length == deleteCheckboxs.length){
                    checkAll.checked = true;
                }else {
                    checkAll.checked = false;
                }
            }
        });
    }
}