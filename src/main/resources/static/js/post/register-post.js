window.onload = () => {
    RegisterService.getInstance().loadPage();

    ComponentEvents.getInstance().clickNavigationButton();
    ComponentEvents.getInstance().clickToggleButton();
    ComponentEvents.getInstance().clickRegisterButton();
    ComponentEvents.getInstance().addChangeEventThumbnailFile();
    ComponentEvents.getInstance().addChangeEventMainImgFile();
    ComponentEvents.getInstance().addChangeEventCategorySelector();

    HeaderService.getInstance().loadHeader();
    HeaderService.getInstance().Categoryload();
}

// -----------------------------------------
//                  Object
// -----------------------------------------
let principalData = null;
let thumbnailFormFlag = true;
let mainImageFormFlag = true;

let registerObj = {
    tourId : 0,
    categoryId : 1,
    userId: null,
    tourTitle : "",
    tourSubTitle : "",
    tourContents : "",
    usageHomepage: "",
    usageNumber: "",
    usageOffDay: "",
    usageRuntime: "",
    usageUsingFee: "",
    usageMainMenu: "",
    usageConvenient: "",
    usageOther: "",
    usageTraffic: ""
}

let thumbnailUrl = null;
let mainImageUrl = null;

let thumbnailObj = {
    files: new Array(),
    formData: new FormData()
}

let mainImgObj = {
    files: new Array(),
    formData: new FormData()
}

let tagList = new Array();

let tagIdList = new Array();
// -----------------------------------------
//                   APIs
// -----------------------------------------
class RegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterApi();
        }
        return this.#instance;
    }

    registerPost() {
        $.ajax({
            async:false,
            type:"post",
            url:`/api/post/register`,
            contentType: "application/json",
            data: JSON.stringify(registerObj),
            dataType:"json",
            success: response => {
                console.log(response);
                registerObj.tourId = response.data;
            },
            error: error => {
                console.log(error);                
            }
        })
    }

    registerPostTags() {
        $.ajax({
            async:false,
            type:"post",
            url:`/api/post/register/${registerObj.tourId}/tag`,
            contentType: "application/json",
            data: JSON.stringify({
                "tagList" : tagList
            }),
            dataType: "json",
            success: response => {
            },error: error => {
                console.log(error);
            }
        });
    }

    registerThumbnail() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/post/register/${registerObj.tourId}/thumbnail`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: thumbnailObj.formData,
            dataType: 'json',
            success: response => {
            },
            error: error => {
                console.log(error);
            }
        });
    }

    registerThumbnailWithLink() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/post/register/${registerObj.tourId}/thumbnail/link`,
            contentType: 'application/json',
            dataType:'json',
            data: JSON.stringify({
                "link" : thumbnailUrl
            }),
            success: response => {
            },
            error: error => {
                console.log(error);
            }
        });
    }

    registerMainImg() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/post/register/${registerObj.tourId}/mainimg`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: mainImgObj.formData,
            dataType: 'json',
            success: response => {
                window.location.href=`http://localhost:8000/post?tourId=${registerObj.tourId}`;
            },
            error: error => {
                console.log(error);
            }
        });
    }

    registerMainImgWithLink() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/post/register/${registerObj.tourId}/mainimg/link`,
            contentType: 'application/json',
            dataType:'json',
            data: JSON.stringify({
                "link" : mainImageUrl
            }),
            success: response => {
                window.location.href=`http://localhost:8000/post?tourId=${registerObj.tourId}`;
            },
            error: error => {
                console.log(error);
            }
        });
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

    getTags() {
        let responseData = null;
        $.ajax({
            async:false,
            type:"get",
            url: `/api/post/${registerObj.categoryId}/tags`,
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
class RegisterService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterService();
        };
        return this.#instance;
    }

    loadPage() {
        principalData = PrincipalApi.getInstance().getPrincipal();
        console.log(principalData);
        if(principalData != null) {
            registerObj.userId = principalData.userMst.userId;
        }
        let categories = RegisterApi.getInstance().getCategories().data;
        const categorySelector = document.querySelector(".category-selector");
        categories.forEach(data => {  
            categorySelector.innerHTML += `
                <option value="${data.categoryId}">${data.categoryName}</option>
            `;
        });
        this.loadTags();
    }

    registerPost() {
        if(registerObj.userId == null) {
            alert("로그인 없이는 게시글을 등록할 수 없습니다!");
            return;
        }
        let thumbnailLink = document.querySelector(".thumbnail-link");
        let mainImageLink = document.querySelector(".mainimg-link");
        let mainTitle = document.querySelector(".main-title");
        let subTitle = document.querySelector(".sub-title");
        let homepageInput = document.querySelector(".homepage-input");
        let numberInput = document.querySelector(".number-input");
        let holidayInput = document.querySelector(".offday-input");
        let runtimeInput = document.querySelector(".runtime-input");
        let usingfeeInput = document.querySelector(".usingfee-input");
        let mainmenuInput = document.querySelector(".mainmenu-input");
        let convenientInput = document.querySelector(".convenient-input");
        let otherInput = document.querySelector(".other-input");
        let trafficInput = document.querySelector(".traffic-input");

        
        registerObj.tourTitle = mainTitle.value;
        registerObj.tourSubTitle = subTitle.value;
        registerObj.tourContents = $('#summernote').summernote('code');
        registerObj.usageHomepage = homepageInput.value;
        registerObj.usageNumber = numberInput.value;
        registerObj.usageOffDay = holidayInput.value;
        registerObj.usageRuntime = runtimeInput.value;
        registerObj.usageUsingFee = usingfeeInput.value;
        registerObj.usageMainMenu = mainmenuInput.value;
        registerObj.usageConvenient = convenientInput.value;
        registerObj.usageOther = otherInput.value;
        registerObj.usageTraffic = trafficInput.value;
        thumbnailUrl = thumbnailLink.value;
        mainImageUrl = mainImageLink.value;

        const tagCheck = document.querySelectorAll(".tag-check");
        tagCheck.forEach((check,index) => {
            if(check.checked) {
                tagList.push(tagIdList[index]);
            }
        });

        RegisterApi.getInstance().registerPost();
        if(tagList.length > 0) {
            RegisterApi.getInstance().registerPostTags();
        } else {
            alert("태그 등록 없이 게시글 등록.");
        }
        
        if(thumbnailFormFlag) {
            if(thumbnailObj.files[0] == null) {
                alert("썸네일 이미지가 없습니다!");
            } else {
                thumbnailObj.formData.append("files", thumbnailObj.files[0]);
                RegisterApi.getInstance().registerThumbnail();
            }
        } else {
            RegisterApi.getInstance().registerThumbnailWithLink();
        }
        
        if(mainImageFormFlag) {
            if(mainImgObj.files[0] == null) {
                alert("메인이미지가 없습니다!");
                location.reload();
            } else {
                mainImgObj.formData.append("files", mainImgObj.files[0]);
                RegisterApi.getInstance().registerMainImg();
            }
        } else {
            RegisterApi.getInstance().registerMainImgWithLink();
        }

    }

    getThumbnailPreview() {
        const thumbnail = document.querySelector(".thumbnail");

        const reader = new FileReader();

        reader.onload = (e) => {
            thumbnail.src = e.target.result;
        }

        console.log(reader.readAsDataURL(thumbnailObj.files[0]));
    }

    getMainImgPreview() {
        const mainImg = document.querySelector(".mainimg");

        const reader = new FileReader();

        reader.onload = (e) => {
            mainImg.src = e.target.result;
        }

        console.log(reader.readAsDataURL(mainImgObj.files[0]));
    }

    loadTags() {
        let tags = RegisterApi.getInstance().getTags().data;
        let tagSelectorContainer = document.querySelector(".tags-selector-container");
        tagSelectorContainer.innerHTML = `
            <h2>태그선택(중복가능)</h2>
        `;
        for(let i = 0; i < 30; i ++) {
            tagIdList.pop();
        }
        tags.forEach((tag,index) => {
            tagIdList.push(tag.tagId);
            tagSelectorContainer.innerHTML += `
                <input type="checkbox" class="tag-check" style="display:none;">
                <li class="tag-button">#${tag.tagName}</li>
            `;
        });
        ComponentEvents.getInstance().clickTagButton();
    }
}

// -----------------------------------------
//                 Events
// -----------------------------------------
class ComponentEvents {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvents();
        };
        return this.#instance;
    }

    clickNavigationButton() {
        const articleButton = document.querySelector('.article-button');
        const usageButton = document.querySelector('.usage-button');
        const mainArticle = document.querySelector('.main-article');
        const mainUsageInformation = document.querySelector('.main-usage-information');
        
        articleButton.onclick = () => {
            mainArticle.classList.remove('off');
            mainUsageInformation.classList.add('off');
        }

        usageButton.onclick = () => {
            mainArticle.classList.add("off");
            mainUsageInformation.classList.remove("off");
        }
    }

    clickToggleButton() {
        const thumbnailToggle = document.querySelector(".thumbnail-toggle");
        const mainImageToggle = document.querySelector(".mainimg-toggle");
        const formThumbnail = document.querySelector(".thumbnail-with-form");
        const linkThumbnail = document.querySelector(".thumbnail-with-link");
        const formMainImage = document.querySelector(".mainimg-with-form");
        const linkMainImage = document.querySelector(".mainimg-with-link");

        thumbnailToggle.onclick = () => {
            if(thumbnailFormFlag == true) {
                thumbnailFormFlag = false;
                formThumbnail.classList.add("off");
                linkThumbnail.classList.remove("off");
            }else {
                thumbnailFormFlag = true;
                formThumbnail.classList.remove("off");
                linkThumbnail.classList.add("off");
            }
        }

        mainImageToggle.onclick = () => {
            if(mainImageFormFlag == true) {
                mainImageFormFlag = false;
                formMainImage.classList.add("off");
                linkMainImage.classList.remove("off");
            }else {
                mainImageFormFlag = true;
                formMainImage.classList.remove("off");
                linkMainImage.classList.add("off");
            }
        }
    } 

    clickRegisterButton() {
        const registerButton = document.querySelector(".register-button");

        registerButton.onclick = () => {
            RegisterService.getInstance().registerPost();
        }
    }

    addChangeEventThumbnailFile() {
        const thumbnailFile = document.querySelector(".thumbnail-file");
        thumbnailFile.onchange = () => {
            const formData = new FormData(document.querySelector(".thumbnail-form"));
            let changeFlag = false;

            thumbnailObj.files.pop();

            formData.forEach(value => {
                if(value.size != 0) {
                    thumbnailObj.files.push(value);
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                RegisterService.getInstance().getThumbnailPreview();
                thumbnailFile.value = null;
            }
        }
    }

    addChangeEventMainImgFile() {
        const mainimgFile = document.querySelector(".mainimg-file");
        mainimgFile.onchange = () => {
            const formData = new FormData(document.querySelector(".mainimg-form"));
            let changeFlag = false;

            mainImgObj.files.pop();

            formData.forEach(value => {
                if(value.size != 0) {
                    mainImgObj.files.push(value);
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                RegisterService.getInstance().getMainImgPreview();
                mainimgFile.value = null;
            }
        }
    }

    addChangeEventCategorySelector() {
        const categorySelector = document.querySelector(".category-selector");
        const categoryMonitor = document.querySelector(".category-monitor");
        categorySelector.onchange = () => {
            categoryMonitor.innerHTML = `
                ${categorySelector.options[categorySelector.selectedIndex].text}
            `;
            registerObj.categoryId = categorySelector.options[categorySelector.selectedIndex].value;
            RegisterService.getInstance().loadTags();
        }
    }

    clickTagButton() {
        const tagButtons = document.querySelectorAll(".tag-button");
        const tagCheck = document.querySelectorAll(".tag-check");
        tagButtons.forEach((tagButton,index) => {
            tagButton.onclick = () => {
                if(tagCheck[index].checked) {
                    tagCheck[index].checked = false;
                } else {
                    tagCheck[index].checked = true;
                }
                tagButton.classList.toggle("selected");
            }
        });
    }
}
