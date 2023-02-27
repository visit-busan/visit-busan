window.onload = () => {
    
}
// -----------------------------------------
//                  Object
// -----------------------------------------

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
            url: "/api/post",
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
        const articleId = URLSearch.get("")
        const data = PostApi.getInstance().getPost();
        const mainTitle = document.querySelector(".main-title");
        const subTitle = document.querySelector(".sub-title");
        const mainImg = document.querySelector(".main-img");
        const rating = document.querySelector(".post-rating");
        const view = document.querySelector(".post-view");
        const review = document.querySelector(".post-review");
        const like = document.querySelector(".post-like");
        const article = document.querySelector(".main-article");
        
        mainTitle.innerHTML = `${data.mainTitle}`;
        subTitle.innerHTML = `${data.subTitle}`;
        mainImg.innerHTML = `<img src="${data.Img}" alt="">`;
        rating.innerHTML = `${data.rating}`;
        view.innerHTML = `${data.view}`;
        review.innerHTML = `${data.review}`;
        like.innerHTML = `${data.like}`;
        article.innerHTML = `${data.article}`;
    }
}

// -----------------------------------------
//                 Events
// -----------------------------------------