window.onload = () => {
    SearchService.getInstance().loadSearchResult();
    SearchService.getInstance().getTags();

    ComponentEvent.getInstance().clickSearchItem();
    ComponentEvent.getInstance().clickOrderButtons();
    ComponentEvent.getInstance().clickSearchButton();
    ComponentEvent.getInstance().clickTagButton();

    HeaderService.getInstance().loadHeader();
    HeaderService.getInstance().Categoryload();
    FooterService.getInstance().loadFooter();
}
// -----------------------------------------
//                   Objs
// -----------------------------------------
let searchObj = {
    categoryId : 2,
    order : "",
    searchValue : "",
    tagName : "",
    page : 1,
    index : 0
}

let tagArray = new Array();

let totalCount = null;
// -----------------------------------------
//                   Apis
// -----------------------------------------
class SearchApi {
    
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchApi();
        }
        return this.#instance;
    }

    getSearchResult() {
        let responseData = null;
        $.ajax({
            async:false,
            type:"post",
            url:"/api/search/result",
            contentType: "application/json",
            data: JSON.stringify(searchObj),
            dataType: "json",
            success: response => {
                responseData = response;
                console.log(response);
            },
            error: error => { 
                console.log(error);
            }
        });
        return responseData;
    }

    getTotalCount () {
        let responseData = null;
        $.ajax({
            async:false,
            type:"post",
            url:"/api/search/total",
            contentType: "application/json",
            data: JSON.stringify(searchObj),
            dataType: "json",
            success: response => {
                responseData = response;
                if(response.data == 0) {
                    alert("검색 결과가 없습니다!");
                }
            },
            error: error => {
                console.log(error);
            } 
        });
        return responseData;
    }

    getTags() {
        let responseData = null;
        $.ajax({
            async:false,
            type:"get",
            url:`/api/search/${searchObj.categoryId}/tags`,
            dataType: "json",
            success: response => {
                responseData = response;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    getCategoryName() {
        let responseData = null;
        $.ajax({
            async:false,
            type:"get",
            url:`/api/search/${searchObj.categoryId}/category`,
            dataType: "json",
            success: response => {
                responseData = response;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData
    }
}

// -----------------------------------------
//                 Services
// -----------------------------------------
class SearchService {
    static #instance = null
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SearchService();
        }
        return this.#instance;
    }

    loadSearchResult() {
        const URLSearch = new URLSearchParams(location.search);
        if(URLSearch.has("categoryId")) {
            const id = URLSearch.get("categoryId");
            if(id == "") {
                history.back();
            }
            searchObj.categoryId = id;
        }
        if(searchObj.categoryId != 0) {
            let categoryName = SearchApi.getInstance().getCategoryName();
            if(categoryName.data != null){
                const categoryContainer = document.querySelector(".home-left");
                categoryContainer.innerHTML = `
                <i class="fa-solid fa-house home-nth"></i>
                <i class="home-nth">></i>
                <a href="http://localhost:8000/search?categoryId=0" class="home-nth">부산에가면</a>
                <i class="home-nth">></i>
                <a href="#" class="home-nth">${categoryName.data}</a>
                `;
            }else {
                alert("존재하지 않는 카테고리 입니다.");
                history.back();
            }
        }

        let responseData = SearchApi.getInstance().getSearchResult();
        let searchContent = document.querySelector(".search-content");
        searchContent.innerHTML = '';
        responseData.data.forEach(data => {
            searchContent.innerHTML += `
            <div class="search-item">
                <textarea class="result-id" readonly style="display:none;">${data.tourId}</textarea>
                <img src="${data.thumbnailImage != null ? data.thumbnailImage.indexOf("http") < 0 ? 'http://localhost:8000/image/' + data.thumbnailImage : data.thumbnailImage : ''}" alt="" class="search-img" />
                <h2 class="search-name">${data.title}</h2>
                <div class="info-container">
                    <p class="view"><i class="fa-regular fa-eye"></i> ${data.viewCount}</p>
                    <p class="comment"><i class="fa-regular fa-comments"></i> ${data.commentCount}</p>
                    <p class="like"><i class="fa-regular fa-thumbs-up"></i> ${data.likeCount}</p>
                </div>
            </div>
            `;
        });
        let totalCountContainer = document.querySelector(".total-count");
        totalCount = SearchApi.getInstance().getTotalCount().data;
        totalCountContainer.innerHTML = `${totalCount}`;
        this.loadSearchNumberList();
        ComponentEvent.getInstance().clickSearchItem();
    }

    getTags() {
        let tags = SearchApi.getInstance().getTags().data;
        if(tags != null) {
            console.log(tags);
        }
        let tagContainer = document.querySelector(".category-container");
        tagArray.push("");
        tags.forEach(tag => {
            tagArray.push(tag);
            tagContainer.innerHTML += `
                <button class="category-item">#${tag}</button>
            `
        });
        console.log(tagArray);
    }

    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");
        pageController.innerHTML = "";
        
        const maxPageNumber = totalCount % 8 == 0 
                                ? Math.floor(totalCount / 8) 
                                : Math.floor(totalCount / 8) + 1;
                                //딱 나누어지면 그냥 나눈값으로, 딱 나누어지지 않으면 +1한 숫자로해야함.
        console.log(maxPageNumber);
        pageController.innerHTML = `
            <a href="javascript:void(0)" class="first-button disabled"> << </a>
            <a href="javascript:void(0)" class="pre-button disabled">이전</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">다음</a>
            <a href="javascript:void(0)" class="end-button disabled"> >> </a>
        `;

        if(searchObj.page !=1) {
            const preButton = pageController.querySelector(".pre-button");
            const firstButton = pageController.querySelector(".first-button");
            preButton.classList.remove("disabled");
            firstButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page --;

                this.loadSearchResult();
            }

            firstButton.onclick = () => {
                searchObj.page = 1;

                this.loadSearchResult();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            const endButton = pageController.querySelector(".end-button");
            nextButton.classList.remove("disabled");
            endButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page ++;

                this.loadSearchResult();
            }

            endButton.onclick = () => {
                searchObj.page = maxPageNumber;

                this.loadSearchResult();
            }
        }

        const startIndex = searchObj.page % 5 == 0 
                            ? searchObj.page - 4 
                            : searchObj.page - (searchObj.page % 5) + 1;

        const endIndex = startIndex + 4 <= maxPageNumber
                            ? startIndex + 4
                            : maxPageNumber;
        
        const numbers = document.querySelector(".page-numbers");

        for(let i = startIndex; i <= endIndex; i++) {
            numbers.innerHTML += `
                <a href="javascript:void(0)"class="page-button ${i == searchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {
            const pageNumber = button.textContent;
            if(pageNumber != searchObj.page) {
                button.onclick = () => {
                    searchObj.page = pageNumber;
                    this.loadSearchResult();
                }
            }
        })

        

    }
}
// -----------------------------------------
//                  Events
// -----------------------------------------

class ComponentEvent {
    static #instance = null;
    static getInstance () {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    clickSearchItem () {
        let searchItems = document.querySelectorAll(".search-item");
        searchItems.forEach(item => {
            item.onclick = () => {
                window.location.href=`http://localhost:8000/post?tourId=${item.children[0].value}`;
            }
        });
    }

    clickOrderButtons () {
        let viewOrderButton = document.querySelectorAll(".sort-value");

        viewOrderButton[0].onclick = () => {
            searchObj.order = "view";
            SearchService.getInstance().loadSearchResult();
            this.clickSearchItem();
        }

        viewOrderButton[1].onclick = () => {
            searchObj.order = "like";
            SearchService.getInstance().loadSearchResult();
            this.clickSearchItem();
        }
    }

    clickSearchButton () {
        let searchInput = document.querySelector(".search-value");
        let searchButton = document.querySelector(".fa-magnifying-glass");

        searchButton.onclick = () => {
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            SearchService.getInstance().loadSearchResult();
            this.clickSearchItem(); 
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }

    clickTagButton () {
        let tagButtons = document.querySelectorAll(".category-item");
        tagButtons.forEach((button,index) => {
            button.onclick = () => {
                searchObj.tagName = tagArray[index];
                SearchService.getInstance().loadSearchResult();
                this.clickSearchItem();
                tagButtons.forEach(btn => {
                    btn.classList.remove("on");
                })
                button.classList.add("on");
            }
        });
    }
}