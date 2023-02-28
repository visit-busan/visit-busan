window.onload = () => {
    PostService.getInstance().loadPage();
    ComponentEvent.getInstance().clickMainNavigation();
}
// -----------------------------------------
//                  Object
// -----------------------------------------
let tourId = null;
// -----------------------------------------
//                   APIs
// -----------------------------------------
class PostApi {
    static #instance = null;
    static getInstance = () => {
        if(this.#instance == null) {
            this.#instance = new PostApi();
        }
        return this.#instance;
    }

    getPost() {
        let responseData = null;
        
        $.ajax({
            async:false,
            type:"get",
            url: `/api/post/${tourId}`,
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
}

// -----------------------------------------
//                 Services
// -----------------------------------------
class PostService {
    static #instance = null;
    static getInstance = () => {
        if(this.#instance == null) {
            this.#instance = new PostService();
        }
        return this.#instance;
    }

    loadPage() {
        const URLSearch = new URLSearchParams(location.search);
        if(URLSearch.has("tourId")) {
            const id = URLSearch.get("tourId");
            if(id == "") {
                return;
            }
            tourId = id;
        }

        const responseData = PostApi.getInstance().getPost();
        console.log(responseData);
        const mainTitle = document.querySelector(".main-title");
        const subTitle = document.querySelector(".sub-title");
        const mainImg = document.querySelector(".main-img");
        //const rating = document.querySelector(".post-rating");
        //const view = document.querySelector(".post-view");
        //const review = document.querySelector(".post-review");
        //const like = document.querySelector(".post-like");
        const article = document.querySelector(".main-article");
        const tellNumber = document.querySelector(".tellnumber");
        const homepageUrl = document.querySelector(".homepageurl");
        const holidayInfo = document.querySelector(".holidayinfo");
        const handicappedArea = document.querySelector(".handicappedarea");
        const usageDayAndTime = document.querySelector(".usagedayandtime");
        const usageAmount = document.querySelector(".usageamount");
        const mainMenu = document.querySelector(".mainmenu");
        const trafficInfo = document.querySelector(".trafficinfo");
        const etcInfo = document.querySelector(".etcinfo");
        const documentTitle = document.querySelector("title");

        documentTitle.innerHTML = `${responseData.data.title}`;
        mainTitle.innerHTML = `${responseData.data.title}`;
        subTitle.innerHTML = `${responseData.data.subtitle}`;
        mainImg.src = `${responseData.data.mainImage}`;
        article.innerHTML = `${responseData.data.contents}`;

        if(responseData.data.tellNumber == "") 
            tellNumber.parentElement.classList.add("off");
        else 
            tellNumber.innerHTML = `${responseData.data.tellNumber}`;
        //-----------------------------------
        if(responseData.data.homepageUrl == "")
            homepageUrl.parentElement.classList.add("off");
        else
            homepageUrl.innerHTML = `${responseData.data.homepageUrl}`;
        //-----------------------------------
        if(responseData.data.holidayInfo == "")
            holidayInfo.parentElement.classList.add("off");
        else
            holidayInfo.innerHTML = `${responseData.data.holidayInfo}`;
        //-----------------------------------
        if(responseData.data.handicappedArea == "")
            handicappedArea.parentElement.classList.add("off");
        else
            handicappedArea.innerHTML = `${responseData.data.handicappedArea}`;
        //-----------------------------------
        if(responseData.data.usageDayAndTime == "")
            usageDayAndTime.parentElement.classList.add("off");
        else
            usageDayAndTime.innerHTML = `${responseData.data.usageDayAndTime}`;
        //-----------------------------------
        if(responseData.data.usageAmount == "")
            usageAmount.parentElement.classList.add("off");
        else
            usageAmount.innerHTML = `${responseData.data.usageAmount}`;;
        //-----------------------------------
        if(responseData.data.mainMenu == "")
            mainMenu.parentElement.classList.add("off");
        else
            mainMenu.innerHTML = `${responseData.data.mainMenu}`;;
        //-----------------------------------
        if(responseData.data.trafficInfo == "")
            trafficInfo.parentElement.classList.add("off");
        else
            trafficInfo.innerHTML = `${responseData.data.trafficInfo}`;;
        //-----------------------------------
        if(responseData.data.etcInfo == "")
            etcInfo.parentElement.classList.add("off");
        else
            etcInfo.innerHTML = `${responseData.data.etcInfo}`;;
        //-----------------------------------  
    }
}

// -----------------------------------------
//                 Events
// -----------------------------------------

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    clickMainNavigation() {
        let articleButton = document.querySelector(".article-button");
        let usageButton = document.querySelector(".usage-button");
        let reviewButton = document.querySelector(".review-button");
        let contentContainer = document.querySelector(".content-container").children;

        articleButton.onclick = () => {
            contentContainer[0].classList.remove("off");
            contentContainer[1].classList.add("off");
            contentContainer[2].classList.add("off");
        }

        usageButton.onclick = () => {
            contentContainer[0].classList.add("off");
            contentContainer[1].classList.remove("off");
            contentContainer[2].classList.add("off");
        }

        reviewButton.onclick = () => {
            contentContainer[0].classList.add("off");
            contentContainer[1].classList.add("off");
            contentContainer[2].classList.remove("off");
        }
    }
}