window.onload = () => {
    TourService.getInstance().loadTourList();
    TourService.getInstance().loadCategories();
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteOne();
    ComponentEvent.getInstance().addClickEventDeleteAll();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
}

const searchObj = {
    page: 1,
    categoryName : "",
    searchValue : "",
    limit: "Y",
    count: 20
}

const tourObj = {
    tourId: "",
    categoryName: "",
    title: "",
    userId: "",
    createDate: "",
    updateDate: "",
}

class TourApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TourApi();
        }
        return this.#instance;
    }

    getTourTotalCount(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/tour/totalcount",
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

    getTourList(searchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/tour",
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

    getTourListbytourId(tourId) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/tour/${tourId}`,
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

    deleteTour(tourId) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/tour/${tourId}`,
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

    deleteTours(deleteArray) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/admin/tours`,
            contentType: "application/json",
            data: JSON.stringify(
                {
                    tourIds: deleteArray
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

class TourService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TourService();
        }
        return this.#instance;
    }

    loadTourList() {
        const responseData = TourApi.getInstance().getTourList(searchObj);
        const checkAll = document.querySelector(".delete-checkall");
        checkAll.checked = false;

        const tourListBody = document.querySelector(".content-table tbody");
        tourListBody.innerHTML = "";

        responseData.forEach((data, index) => {
            tourListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="tour-id">${data.tourId}</td>
                    <td>${data.categoryName}</td>
                    <td>${data.title}</td>
                    <td>${data.username}</td>
                    <td>${data.updateDate}</td>
                    <td>
                        <div class="manage-button">
                            <div class="modify-button">
                                <a href="/post/modify/${data.tourId}"><i class="fa-solid fa-pen-to-square"></i></a>
                            </div>
                            <div class="delete-one"><i class="fa-solid fa-trash-can"></i></div>
                        </div>
                    </td>
                </tr>
            `;
        });

        this.loadTourNumberList();
        ComponentEvent.getInstance().addClickEventDeleteCheckbox();
    }

    loadCategories() {
        const responseData = TourApi.getInstance().getCategories();

        const categorySelect = document.querySelector(".category-select");
        categorySelect.innerHTML = `<option value="">전체조회</option>`;

        responseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data.categoryId}">${data.categoryName}</option>
            `;
        });
    }

    removeTour(tourId) {
        let successFlag = TourApi.getInstance().deleteTour(tourId);
        if(successFlag) {
            searchObj.page = 1;
            this.loadTourList();
        }
    }

    removeTours(deleteArray) {
        let successFlag = TourApi.getInstance().deleteTours(deleteArray);
        if(successFlag) {
            searchObj.page = 1;
            this.loadTourList();
        }
    }

    loadTourNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalCount = TourApi.getInstance().getTourTotalCount(searchObj);
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
                this.loadTourList();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;
                this.loadTourList();
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
                    this.loadTourList();
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
            TourService.getInstance().loadTourList();
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }

    addClickEventDeleteOne() {
        const deleteOne = document.querySelectorAll(".delete-one");
        const tourIds = document.querySelectorAll(".tour-id");

        deleteOne.forEach((button, index) => {
            button.onclick = () => {
                if(confirm("정말로 삭제하시겠습니까?")){
                    TourApi.getInstance().deleteTour(tourIds[index].textContent);
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
                        const tourIds = document.querySelectorAll(".tour-id");
                        deleteArray.push(tourIds[index].textContent);
                    }
                });

                TourApi.getInstance().deleteTours(deleteArray);
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
    };
}