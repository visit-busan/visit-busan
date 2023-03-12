window.onload = () => {
    PostService.getInstance().loadPage();
    PostService.getInstance().loadReviews();

    ComponentEvent.getInstance().clickMainNavigation();
    ComponentEvent.getInstance().clickStarButton();
    ComponentEvent.getInstance().clickReviewWriteButton();
    ComponentEvent.getInstance().clickReviewSubmit();
    ComponentEvent.getInstance().addChangeEventModalInput();
    ComponentEvent.getInstance().clickReviewDelete();

    HeaderService.getInstance().loadHeader();
    HeaderService.getInstance().Categoryload();
    FooterService.getInstance().loadFooter();
}

// -----------------------------------------
//                  Object
// -----------------------------------------
let tourId = null;
let principalData = null;


let reviewObj = {
    reviewId : 0,
    userId : null,
    rating : 5,
    visitStatus : 1,
    reviewContent : ""
}

let reviewImgObj = {
    fileOne : null,
    fileTwo : null,
    fileThree : null,
    formData: new FormData()
}

let deleteReviewObj = {
    userId : null,
    reviewId : null,
}

let modalFlag = false

let likeObj = {
    userId : null,
    tourId : null
}
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
                $.ajax({
                    async:false,
                    type:"put",
                    url:`/api/post/${tourId}/view`,
                    dataType:"json",
                    success: response => {
                    },
                    error: error => {
                        console.log(error);
                    }
                })
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

    getCategories() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `/api/post/categories`,
            dataType: "json",
            success: response => {
                responseData = response
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

    getLikeCount() {
        let responseData = null;

        $.ajax({
            async:false,
            type:"get",
            url: `/api/post/${tourId}/likes`,
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

    getIsLike() {
        let responseData = null

        $.ajax({
            async:false,
            type:"post",
            url: `/api/post/like`,
            contentType: "application/json",
            data: JSON.stringify(likeObj),
            dataType: "json",
            success: response => {
                responseData = response;
            },
            error : error => {
                console.log(error);
            }
        });

        return responseData;
    }

    toggleLike() {
        let responseData = null;

        $.ajax({
            async:false,
            type:"post",
            url: `/api/post/${tourId}/like`,
            contentType: "application/json",
            data: JSON.stringify(likeObj),
            dataType: "json",
            success: response => {
                responseData =response;
            },
            error:error => {
                console.log(error);
            }
        });

        return responseData;
    }

    registerReview() {
            $.ajax({
            async:false,
            type:"POST",
            url:`/api/post/${tourId}/review`,
            contentType: "application/json",
            data: JSON.stringify(reviewObj),
            dataType: "json",
            success: response => {
                if(reviewImgObj.fileOne != null 
                    || reviewImgObj.fileTwo != null 
                    || reviewImgObj.fileThree != null) {
                    $.ajax({
                        async:false,
                        type:"POST",
                        url:`/api/post/${response.data}/review/image`,
                        encType: "multipart/form-data",
                        contentType: false,
                        processData: false,
                        data: reviewImgObj.formData,
                        dataType: 'json',
                        success: response => {
                            alert("리뷰 등록 완료!");
                            location.reload();
                        },
                        error: error => {
                            console.log(error);
                        }
                    });
                }else {
                    alert("이미지 없이 리뷰 등록 완료!");
                    location.reload();
                }
            },
            error: error => {
                console.log(error);
            }
        });
    }

    getReviews() {
        let responseData = null;
        $.ajax({
            async:false,
            type:"GET",
            url:`/api/post/${tourId}/review`,
            dataType: 'json',
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    deleteReview() {
        $.ajax({
            async:false,
            type:"delete",
            url:`/api/post/${tourId}/review`,
            contentType: "application/json",
            data: JSON.stringify(deleteReviewObj),
            dataType: 'json',
            success: response => {
                alert("리뷰 삭제 완료!");
                location.reload();
            },
            error: error => {
                console.log(error);
            }
        });
    }

    deletePost() {
        $.ajax({
            async:false,
            type:"delete",
            url:`/api/post/${tourId}`,
            dataType: 'json',
            success: response => {
                alert("게시글 삭제 완료!");
                window.location.href='http://www.localhost:8000/search?categoryId=0';
            },
            error: error => {
                console.log(error);
            }
        });
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
                history.back();
            }
            tourId = id;
        }

        principalData = PrincipalApi.getInstance().getPrincipal();
        
        const responseData = PostApi.getInstance().getPost();
        console.log(principalData);
        console.log(responseData);
        const categories = PostApi.getInstance().getCategories();

        if(responseData == null) {
            alert("존재하지 않는 게시글입니다.");
            window.location.href='http://www.localhost:8000/';
        }

        if(principalData != null) {
            let authorityFlag = false;

            principalData.authorities.forEach(authority => {
                if(authority.authority == "ROLE_ADMIN") {
                    authorityFlag = true;
                }});

            if(principalData.userMst.userId == responseData.data.userId  || authorityFlag) {
                const modifyButton = document.querySelector(".modify-buttons");
                modifyButton.innerHTML = `
                    <ul>
                        <li class="modify-button">수정</li>
                        <li class="delete-button">삭제</li>
                    </ul>
                `;
                ComponentEvent.getInstance().clickModifyButtons();
            }
        }
            
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
        const reviewRating = document.querySelector(".post-rating");
        const postView = document.querySelector(".post-view");
        const categoryNavigator = document.querySelector(".category-navigator");

        categories.data.forEach(category => {
            if(category.categoryId == responseData.data.categoryId) {
                categoryNavigator.innerHTML += `
                <a href="http://localhost:8000/search?categoryId=${category.categoryId}"><b>${category.categoryName}</b></a>
                `;
            }
        });
        
        documentTitle.innerHTML = `${responseData.data.title}`;
        mainTitle.innerHTML = `${responseData.data.title}`;
        subTitle.innerHTML = `${responseData.data.subtitle}`;
        article.innerHTML = `${responseData.data.contents}`;

        let rating =  responseData.data.rating;
        if(rating != null) {
            let subRating = rating.substring(0, rating.indexOf(".") + 2);
            reviewRating.innerHTML = subRating;
        };
        
        postView.innerHTML = responseData.data.viewCount;        
        
        if(responseData.data.mainImage != null) {
            if(responseData.data.mainImage.indexOf("mainimage") < 0) 
                mainImg.src = `${responseData.data.mainImage}`;
            else 
                mainImg.src = `http://localhost:8000/image/${responseData.data.mainImage}`;
        }

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
        this.getLikeCount();
        this.loadIsLike();
        ComponentEvent.getInstance().clickLikeButton();
    }

    loadReviews() {
        let reviewData = PostApi.getInstance().getReviews();
        if (reviewData != null){
            console.log(reviewData);
            let reviewContainer = document.querySelector(".review-container");
            reviewContainer.innerHTML = ``;
            let reviewCount = document.querySelector(".post-review");
            reviewCount.innerHTML = reviewData.length;
            
            if(principalData == null) {
                reviewData.forEach(data => {
                    reviewContainer.innerHTML += `
                    <div class="review-item">
                        <div class="user-info">
                            <span class="user-name">${data.username}</span>
                            <span class="create-date">${data.createDate}</span>
                            <span>★<b class="review-rating">${data.rating}</b></span>
                        </div>
                        <div class="review-contents">
                            <span class="visit-status">${data.visit == 1 ? "방문했음" : "방문하지 않음"}</span>
                            <textarea class="review-content" readonly>${data.reviewComment}</textarea>
                            <div class="review-img-container">
                                ${data.commentDtl[0].saveName != null ?
                                    '<img src="http://localhost:8000/image/review/' + data.commentDtl[0].saveName + '"alt="">' : ""}
        
                                ${data.commentDtl[0].saveName != null && data.commentDtl.length > 1 ?
                                    '<img src="http://localhost:8000/image/review/' + data.commentDtl[1].saveName + '"alt="">' : ""}
        
                                ${data.commentDtl[0].saveName != null && data.commentDtl.length > 2 ?
                                    '<img src="http://localhost:8000/image/review/' + data.commentDtl[2].saveName + '"alt="">' : ""}
                            </div>
                        </div>
                    </div>
                    `;
                });
            } else {
                reviewData.forEach(data => {
                    reviewContainer.innerHTML += `
                    <div class="review-item">
                        <div class="user-info">
                            <textarea class="review-id" style="display:none;" readonly>${data.commentId}</textarea>
                            <span class="user-name">${data.username}</span>
                            <span class="create-date">${data.createDate}</span>
                            <span>★<b class="review-rating">${data.rating}</b></span>
                        </div>
                        <div class="review-contents">
                            <span class="visit-status">${data.visit == 1 ? "방문했음" : "방문하지 않음"}${principalData.userMst.userId == data.userId ? '<b class="review-delete">X</b>' :""}</span>
                            <textarea class="review-content" readonly>${data.reviewComment}</textarea>
                            <div class="review-img-container">
                                ${data.commentDtl[0].saveName != null ?
                                    '<img src="http://localhost:8000/image/review/' + data.commentDtl[0].saveName + '"alt="">' : ""}
        
                                ${data.commentDtl[0].saveName != null && data.commentDtl.length > 1 ?
                                    '<img src="http://localhost:8000/image/review/' + data.commentDtl[1].saveName + '"alt="">' : ""}
        
                                ${data.commentDtl[0].saveName != null && data.commentDtl.length > 2 ?
                                    '<img src="http://localhost:8000/image/review/' + data.commentDtl[2].saveName + '"alt="">' : ""}
                            </div>
                        </div>
                    </div>
                    `;
                });
            }
        }
    }

    loadIsLike() {
        likeObj.tourId = tourId;
        if(principalData == null) {
            return;
        }
        likeObj.userId = principalData.userMst.userId;
        const likeButton = document.querySelector(".like-button");
        let isLike = PostApi.getInstance().getIsLike();
        
        if(isLike.data) {
            likeButton.classList.add("liked");
        } else {
            likeButton.classList.remove("liked");
        }
    }

    registerReview() {
        if(principalData == null) {
            alert("로그인없이 리뷰를 작성하실 수 없습니다.");
            return;
        }
        let visitStatusSelector = document.querySelector(".visit-status-selector");
        let reviewInput = document.querySelector(".review-content-input");
        reviewObj.visitStatus = visitStatusSelector.value;
        reviewObj.userId = principalData.userMst.userId;
        reviewObj.reviewContent = reviewInput.value;
                
        if(reviewImgObj.fileOne != null) {
            reviewImgObj.formData.append("files", reviewImgObj.fileOne);
        }

        if(reviewImgObj.fileTwo != null) {
            reviewImgObj.formData.append("files", reviewImgObj.fileTwo);
        }

        if(reviewImgObj.fileThree != null) {
            reviewImgObj.formData.append("files", reviewImgObj.fileThree);
        }

        PostApi.getInstance().registerReview();
    }

    deleteReview(e) {
        deleteReviewObj.userId = principalData.userMst.userId;
        deleteReviewObj.reviewId = e.target.parentElement.parentElement.parentElement.children[0].children[0].value;
        if(confirm("정말 리뷰를 삭제하시겠습니까?")) {
            PostApi.getInstance().deleteReview();
        }
    }

    getLikeCount() {
        const postLike = document.querySelector(".post-like");
        const likeCount = PostApi.getInstance().getLikeCount();
        postLike.innerHTML = likeCount.data;
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

    clickStarButton() {
        let stars = document.querySelector(".modal-rating").children;

        for(let i = 0; i < stars.length; i ++) {
            stars[i].onclick = () => {
                reviewObj.rating = i + 1;
                stars[0].classList.remove("enable");
                stars[1].classList.remove("enable");
                stars[2].classList.remove("enable");
                stars[3].classList.remove("enable");
                stars[4].classList.remove("enable");
                for(let e = 0; e <= i; e++) {
                    stars[e].classList.add("enable");
                }
                console.log(reviewObj.rating);
            }
        }
    }

    addChangeEventModalInput() {
        const inputOne = document.querySelector(".input-one");
        const inputTwo = document.querySelector(".input-two");
        const inputThree = document.querySelector(".input-three");

        inputOne.onchange = () => {
            const formData = new FormData(document.querySelector(".form-one"));
            const imageOne = document.querySelector('.image-one');
            let changeFlag = false;

            reviewImgObj.fileOne = null;
            
            formData.forEach(value => {
                if(value.size != 0) {
                    reviewImgObj.fileOne = value;
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                inputOne.value = null;
                const reader = new FileReader();

                reader.onload = (e) => {
                    imageOne.src = e.target.result;
                }

                console.log(reader.readAsDataURL(reviewImgObj.fileOne));
            }
        }
        inputTwo.onchange = () => {
            const formData = new FormData(document.querySelector(".form-two"));
            const imageTwo = document.querySelector('.image-two');
            let changeFlag = false;

            reviewImgObj.fileTwo = null;
            
            formData.forEach(value => {
                if(value.size != 0) {
                    reviewImgObj.fileTwo = value;
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                inputTwo.value = null;
                const reader = new FileReader();

                reader.onload = (e) => {
                    imageTwo.src = e.target.result;
                }

                console.log(reader.readAsDataURL(reviewImgObj.fileTwo));
            }
        }
        inputThree.onchange = () => {
            const formData = new FormData(document.querySelector(".form-three"));
            const imageThree = document.querySelector('.image-three');
            let changeFlag = false;

            reviewImgObj.fileThree = null;
            
            formData.forEach(value => {
                if(value.size != 0) {
                    reviewImgObj.fileThree = value;
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                inputThree.value = null;
                const reader = new FileReader();

                reader.onload = (e) => {
                    imageThree.src = e.target.result;
                }

                console.log(reader.readAsDataURL(reviewImgObj.fileThree));
            }
        }
    }

    clickModifyButtons() {
        if(principalData == null) {
            return;
        }
        const modifyButton = document.querySelector(".modify-button");
        const deleteButton = document.querySelector(".delete-button");
        modifyButton.onclick = () => {
            window.location.href=`http://www.localhost:8000/post/modify/${tourId}`;
        }

        deleteButton.onclick = () => {
            if(confirm("정말로 게시글을 삭제하시겠습니까? 돌이킬 수 없습니다.")) {
                PostApi.getInstance().deletePost();
            }
        }
    }

    clickLikeButton () {
        const likeButton = document.querySelector(".like-button");

        likeButton.onclick = () => {
            if(principalData == null) {
                alert("로그인 없이 좋아요 버튼을 누르실 수 없습니다.");
                return;
            }
            PostApi.getInstance().toggleLike();
            PostService.getInstance().loadIsLike();
            PostService.getInstance().getLikeCount();
        }
    }

    clickReviewWriteButton() {
        let reviewWriteButton = document.querySelector(".review-write-button");
        let modalCancel = document.querySelector(".modal-cancel");
        let body = document.querySelector("body");

        const modal = document.querySelector("#modal");

        reviewWriteButton.onclick = () => {
            if(principalData == null) {
                alert("로그인 없이 리뷰등록할 수 없습니다.");
                return;
            }
            modal.style.display = 'flex';
        }

        modalCancel.onclick = () => {
            modal.style.display = 'none';
        }
    }

    clickReviewSubmit() {
        let reviewSubmitButton = document.querySelector(".modal-submit");

        reviewSubmitButton.onclick = () => {
            PostService.getInstance().registerReview();
        }
    }

    clickReviewDelete() {
        if(principalData != null) {
            let reviewDeleteButton = document.querySelectorAll(".review-delete");

            reviewDeleteButton.forEach(button => {
                button.onclick = (e) => {
                    PostService.getInstance().deleteReview(e);
                }
            });
        }
    }
}