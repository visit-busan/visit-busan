window.onload = () => {
    TagService.getInstance().loadTagList();
    TagService.getInstance().loadCategories();
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteOne();
    ComponentEvent.getInstance().addClickEventDeleteAll();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
    ComponentEvent.getInstance().addClickEventRegisterButton();
    ComponentEvent.getInstance().addClickEventModalRegisterButton();
    ComponentEvent.getInstance().addClickEventModalRegisterCancelButton();
    ComponentEvent.getInstance().addClickEventModifyButton();
    ComponentEvent.getInstance().addClickEventModalModifyButton();
    ComponentEvent.getInstance().addClickEventModalModifyCancelButton();
}

const searchObj = {
    page: 1,
    categoryName : "",
    searchValue : "",
    limit: "Y",
    count: 20
}

const tagObj = {
    tagId: "",
    categoryName: "",
    tagName: "",
    userId: "",
    createDate: "",
    updateDate: "",
}

const principalData = PrincipalApi.getInstance().getPrincipal();

class TagApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TagApi();
        }
        return this.#instance;
    }

    getTagTotalCount(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/tag/totalcount",
            data: {
                "categoryName" : searchObj.categoryName,
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

    getTagList(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/tags",
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

    getCategories() {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/categories",
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error : error => {
                console.log(error);
            }
        });
        return returnData;
    }

    getTagListbytagId(tagId) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/tag/${tagId}`,
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

    registerTag() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://127.0.0.1:8000/api/admin/tag",
            contentType: "application/json",
            data: JSON.stringify(tagObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
                TagService.getInstance().setRegisterErrors(error.responseJSON.data);
            }

        });

        return successFlag;
    }

    modifyTag(tagId) {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "put",
            url: `http://localhost:8000/api/admin/tag/${tagId}`,
            contentType: "application/json",
            data: JSON.stringify(tagObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
                TagService.getInstance().setModifyErrors(error.responseJSON.data);
            }
        })

        return successFlag;
    }

    deleteTag(tagId) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/tag/${tagId}`,
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

    deleteTags(deleteArray) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/tags`,
            contentType: "application/json",
            data: JSON.stringify(
                {
                    tagIds: deleteArray
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

class TagService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TagService();
        }
        return this.#instance;
    }

    loadTagList() {
        const responseData = TagApi.getInstance().getTagList(searchObj);
        const checkAll = document.querySelector(".delete-checkall");
        checkAll.checked = false;

        const tagListBody = document.querySelector(".content-table tbody");
        tagListBody.innerHTML = "";

        responseData.forEach((data, index) => {
            tagListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="tag-id">${data.tagId}</td>
                    <td>${data.categoryName}</td>
                    <td>${data.tagName}</td>
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

        this.loadTagNumberList();
        ComponentEvent.getInstance().addClickEventDeleteCheckbox();
    }

    loadCategories() {
        const responseData = TagApi.getInstance().getCategories();

        const categorySelect = document.querySelector(".category-select");
        categorySelect.innerHTML = `<option value="">전체조회</option>`;

        responseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data.categoryId}">${data.categoryName}</option>
            `;
        });
    }

    loadModalCategories() {
        const responseData = TagApi.getInstance().getCategories();

        const categorySelect = document.querySelectorAll(".register-tag");
        categorySelect[0].innerHTML = `<option value="">전체조회</option>`;

        responseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data.categoryId}">${data.categoryName}</option>
            `;
        });
    }

    loadModifyTagList(tagId) {
        const responseData = TagApi.getInstance().getTagListbytagId(tagId);
        const categoryData = TagApi.getInstance().getCategories();
        const modalModifyTag = document.querySelectorAll(".modify-tag");
        // console.log(responseData);
        // if(responseData == null) {
        //     alert("해당 태그 코드는 등록되지 않은 코드입니다.")
        //     history.back();
        //     return;
        // }

        modalModifyTag[0].textContent = responseData.tagId;
        modalModifyTag[1].innerHTML = `<option value="${responseData.categoryId}">${responseData.categoryName}</option>`;

        categoryData.forEach(data => {
            // console.log(data.categoryName != responseData.categoryName);
            if(data.categoryName != responseData.categoryName){
                modalModifyTag[1].innerHTML += `
                    <option value="${data.categoryId}">${data.categoryName}</option>
                `;
            }
        });
        modalModifyTag[2].value = responseData.tagName;
        modalModifyTag[3].value = responseData.username;
        modalModifyTag[4].textContent = responseData.createDate;
        modalModifyTag[5].textContent = responseData.updateDate;
    }

    setTagRegisterValues() {
        const registerTagInputs = document.querySelectorAll(".modal-form-register input");
        // console.log(registerTagInputs[0].value);
        // console.log(principalData.userMst.userId);
        tagObj.userId = principalData.userMst.userId;
        tagObj.categoryName = registerTagInputs[0].value;
        tagObj.tagName = registerTagInputs[1].value;
    }

    setRegisterErrors(errors) {
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearRegisterErrors();

        Object.keys(errors).forEach(key => {
            if(key == "tagName") {
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

    setTagModifyValues() {
        const modifyTagInputs = document.querySelectorAll(".modify-tag");
        // console.log(modifyCategoryInputs[0].value);
        // console.log(responseData.updateDate);
        // console.log(principalData.userMst.userId);
        tagObj.tagId = modifyTagInputs[0].textContent;
        tagObj.categoryId = modifyTagInputs[1].value;
        tagObj.tagName = modifyTagInputs[2].value;
        tagObj.userId = principalData.userMst.userId;
    }

    setModifyErrors(errors) {
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearModifyErrors();

        Object.keys(errors).forEach(key => {
            if(key == "tagName") {
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

    removeTag(tagId) {
        let successFlag = TagApi.getInstance().deleteTag(tagId);
        if(successFlag) {
            searchObj.page = 1;
            this.loadTagList();
        }
    }

    removeTags(deleteArray) {
        let successFlag = TagApi.getInstance().deleteTags(deleteArray);
        if(successFlag) {
            searchObj.page = 1;
            this.loadTagList();
        }
    }


    loadTagNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalCount = TagApi.getInstance().getTagTotalCount(searchObj);
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
                this.loadTagList();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;
                this.loadTagList();
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
                    this.loadTagList();
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
        const categorySelect = document.querySelector(".category-select");
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {
            searchObj.categoryName = categorySelect.value;
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            TagService.getInstance().loadTagList();
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
            TagService.getInstance().loadModalCategories();
        }
    }

    addClickEventModalRegisterButton() {
        const modalRegisterInput = document.querySelector(".modal-form-register input");
        const modalRegisterButton = document.querySelector(".modal-register-button");
        // console.log(modalRegisterInput);

        modalRegisterButton.onclick = () => {
            TagService.getInstance().setTagRegisterValues();
            const successFlag = TagApi.getInstance().registerTag();

            if(!successFlag) {
                return;
            }

            TagService.getInstance().clearRegisterErrors();
            location.reload();
        }

        modalRegisterInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                modalRegisterButton.click();
            }
        }
    }

    addClickEventModalRegisterCancelButton() {
        const modalCancelButton = document.querySelector(".modal-window-register .close-button");
        const modalcancelButton = document.querySelector(".modal-window-register .modal-cancel-button");

        modalcancelButton.onclick = () => {
            location.reload();
        }

        modalCancelButton.onclick = () => {
            location.reload();
        }
    }

    addClickEventModifyButton() {
        const modifyButtons = document.querySelectorAll(".modify-button");
        const tagIds = document.querySelectorAll(".tag-id");
        const modal = document.querySelector("#modal");
        const modalModifyWindow = document.querySelector(".modal-window-modify");

        modifyButtons.forEach((modifyButton, index) => {
            modifyButton.onclick = () => {
                const tagData = TagApi.getInstance().getTagListbytagId(tagIds[index].textContent);
                // console.log(tagIds[index].textContent);
                // console.log(tagData);
                modal.style.display = "flex";
                modalModifyWindow.style.display = "block";
                TagService.getInstance().loadModifyTagList(tagIds[index].textContent);                
            }
        })
    }

    addClickEventModalModifyButton() {
        const modalModifyButton = document.querySelector(".modal-modify-button");
        const tagContents = document.querySelectorAll(".modify-tag");

        modalModifyButton.onclick = () => {
            console.log(tagContents[0].textContent);
            TagService.getInstance().setTagModifyValues();
            const successFlag = TagApi.getInstance().modifyTag(tagContents[0].textContent);

            if(!successFlag) {
                return;
            }

            TagService.getInstance().clearModifyErrors();
            location.reload();

        }
    }

    addClickEventModalModifyCancelButton() {
        const modalCancelButton = document.querySelector(".modal-window-modify .close-button");
        const modalcancelButton = document.querySelector(".modal-window-modify .modal-cancel-button");

        modalcancelButton.onclick = () => {
            location.reload();
        }

        modalCancelButton.onclick = () => {
            location.reload();
        }
    }

    addClickEventDeleteOne() {
        const deleteOne = document.querySelectorAll(".delete-one");
        const tagIds = document.querySelectorAll(".tag-id");

        deleteOne.forEach((button, index) => {
            button.onclick = () => {
                if(confirm("정말로 삭제하시겠습니까?")){
                    TagApi.getInstance().deleteTag(tagIds[index].textContent);
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
                        const tagIds = document.querySelectorAll(".tag-id");
                        deleteArray.push(tagIds[index].textContent);
                    }
                });

                TagApi.getInstance().deleteTags(deleteArray);
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