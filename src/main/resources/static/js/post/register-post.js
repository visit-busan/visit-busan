window.onload = () => {
    ComponentEvents.getInstance().initializeButton();
    ComponentEvents.getInstance().registerButton();
    ComponentEvents.getInstance().clickImgs();
    ComponentEvents.getInstance().clickMainNavigation();
    ComponentEvents.getInstance().addChangeEventThumbnailFile();
    ComponentEvents.getInstance().addChangeEventMainImgFile();
}
// -----------------------------------------
//                  Object
// -----------------------------------------

let registerObj = {
    tourId : "",
    tourCategory : "",
    userId: "4",
    tourTitle : "",
    tourSubTitle : "",
    tourContents : "",
    tourTrafficInformation : "",
    tourHandicappedArea : "",
    usageHomepage: "",
    usageNumber: "",
    usageRunDay: "",
    usageOffDay: "",
    usageRuntime: "",
    usageUsingFee: "",
    usageMainMenu: "",
    usageConvenient: "",
    usageOther: "",
    usageTraffic: ""
}

let thumbnailObj = {
    files: new Array(),
    formData: new FormData()
}

let mainImgObj = {
    files: new Array(),
    formData: new FormData()
}

// -----------------------------------------
//                   APIs
// -----------------------------------------

class RegisterApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterApi();
        };
        return this.#instance;
    }

    registerPost() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://localhost:8000/api/post/register",
            contentType: "application/json",
            data: JSON.stringify(registerObj),
            dataType: "json",
            success: response => {
                successFlag = true;
                registerObj.tourId = response.data;
                console.log(registerObj);
            },
            error: error => {
                console.log(error);
            }
        });

        return successFlag
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
                alert("Thumbnail 등록 완료!");
            },
            error: error => {
                console.log(error);
                this.registerMainImg();
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
                alert("게시글 등록 완료!");
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

class RegisterService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterService();
        };
        return this.#instance;
    }

    initializeContent() {
        if(confirm("정말 게시글 내용을 지우시겠습니까?")) {
            let contentArea = document.querySelector(".note-editable");
            let inputs = document.querySelectorAll("Input");
            contentArea.innerHTML = `   `;
            
            inputs.forEach(input => {
                input.value = "";
            })
        };
    }

    registerPost() {
        let mainTitle = document.querySelector(".main-title");
        let subTitle = document.querySelector(".sub-title");
        let homepage = document.querySelector(".homepage-input");
        let number = document.querySelector(".number-input");
        let runday = document.querySelector(".runday-input");
        let offday = document.querySelector(".offday-input");
        let runtime = document.querySelector(".runtime-input");
        let usingfee = document.querySelector(".usingfee-input");
        let mainmenu = document.querySelector(".mainmenu-input");
        let convenient = document.querySelector(".convenient-input");
        let other = document.querySelector(".other-input");
        let traffic = document.querySelector(".traffic-input");
        let category = document.querySelector(".category-selector");
        
        registerObj.tourTitle = mainTitle.value;
        registerObj.tourSubTitle = subTitle.value;
        registerObj.tourContents = $('#summernote').summernote('code');
        registerObj.usageHomepage = homepage.value;
        registerObj.usageNumber = number.value;
        registerObj.usageRunDay = runday.value;
        registerObj.usageOffDay = offday.value;
        registerObj.usageRuntime = runtime.value;
        registerObj.usageUsingFee = usingfee.value;
        registerObj.usageMainMenu = mainmenu.value;
        registerObj.usageConvenient = convenient.value;
        registerObj.usageOther = other.value;
        registerObj.usageTraffic = traffic.value;
        registerObj.tourCategory = category.value;

        thumbnailObj.formData.append("files", thumbnailObj.files[0]);
        mainImgObj.formData.append("files", mainImgObj.files[0]);

        RegisterApi.getInstance().registerPost();
        RegisterApi.getInstance().registerThumbnail();
        RegisterApi.getInstance().registerMainImg();
    }

    getThumbnailPreview() {
        const thumbnailImg = document.querySelector(".thumbnail");

        const reader = new FileReader();

        reader.onload = (e) => {
            thumbnailImg.src = e.target.result;
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
}
// -----------------------------------------
//                  Events
// -----------------------------------------

class ComponentEvents {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvents();
        };
        return this.#instance;
    }

    initializeButton() {
        let initializeButton = document.querySelector(".initialize-button");
        
        initializeButton.onclick = () => {
            RegisterService.getInstance().initializeContent();
        }
    };

    registerButton() {
        let registerButton = document.querySelector(".register-button");

        registerButton.onclick = () => {
            RegisterService.getInstance().registerPost();
        }
    }

    clickImgs() {
        let thumbnail = document.querySelector(".thumbnail");
        let thumbnailAdd = document.querySelector(".thumbnail-file");

        let mainImg = document.querySelector(".mainimg");
        let mainImgAdd = document.querySelector(".mainimg-file");

        thumbnail.onclick = () => {
            thumbnailAdd.click();
        }

        mainImg.onclick = () => {
            mainImgAdd.click();
        }
    }

    clickMainNavigation() {
        let articleButton = document.querySelector(".article-button");
        let usageButton = document.querySelector(".usage-button");
        let contentContainer = document.querySelector(".content-container").children;

        articleButton.onclick = () => {
            contentContainer[0].classList.remove("off");
            contentContainer[1].classList.add("off");
        }

        usageButton.onclick = () => {
            contentContainer[0].classList.add("off");
            contentContainer[1].classList.remove("off");
        }
    }

    addChangeEventThumbnailFile() {
        const thumbnailFile = document.querySelector(".thumbnail-file");
        thumbnailFile.onchange = () => {
            const formData = new FormData(document.querySelector(".thumbnail-form"));
            let changeFlag = false;

            thumbnailObj.files.pop();

            formData.forEach(value => {
                console.log("thumbnail-form.input.value : " + value);

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
                console.log("mainimg-form.input.value : " + value);

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
}
