window.onload = () => {
    ComponentEvents.getInstance().getContentButton();
    ComponentEvents.getInstance().clickNavigationButton();
    ComponentEvents.getInstance().clickToggleButton();
    ComponentEvents.getInstance().clickModifyButton();
    ComponentEvents.getInstance().addChangeEventThumbnailFile();
    ComponentEvents.getInstance().addChangeEventMainImgFile();

    ModifyService.getInstance().loadPage();
}

// -----------------------------------------
//                  Object
// -----------------------------------------
let principalData = null;
let thumbnailFormFlag = true;
let mainImageFormFlag = true;

let modifyObj = {
    tourId : null,
    categoryId : null,
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

let categories = null;
let tags = null;
let tourTags = null;
let tagList = new Array();
let tagIdList = new Array();
// -----------------------------------------
//                   APIs
// -----------------------------------------
class ModifyApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyApi();
        }
        return this.#instance;
    }

    getPost() {
        let responseData = null;
        
        $.ajax({
            async:false,
            type:"get",
            url: `/api/post/${modifyObj.tourId}`,
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

    getPostTag() {
        let responseData = null;

        $.ajax({
            async:false,
            type:"get",
            url: `/api/post/${modifyObj.tourId}/tag`,
            dataType:"json",
            success: response => {
                responseData = response
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }

    modifyPost() {
        $.ajax({
            async:false,
            type:"PUT",
            url:`/api/post/${modifyObj.tourId}`,
            contentType: "application/json",
            data: JSON.stringify(modifyObj),
            dataType:"json",
            success: response => {
            },
            error: error => {
                console.log(error);
            }
        })
    }

    deletePostTags() {
        $.ajax({
            async:false,
            type:"delete",
            url:`/api/post/${modifyObj.tourId}/tag`,
            dataType: "json",
            success: response => {
                alert(response.data + " 개 태그 삭제 완료");
            },
            error: error => {
                console.log(error)
            }
        });
    }

    modifyPostTags() {
        $.ajax({
            async:false,
            type:"post",
            url:`/api/post/register/${modifyObj.tourId}/tag`,
            contentType: "application/json",
            data: JSON.stringify({
                "tagList" : tagList
            }),
            dataType: "json",
            success: response => {
                alert("태그등록완료");
            },error: error => {
                console.log(error);
            }
        });
    }

    modifyThumbnail() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/post/modify/${modifyObj.tourId}/thumbnail`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: thumbnailObj.formData,
            dataType: 'json',
            success: response => {
                alert("썸네일 파일 등록 완료!");
            },
            error: error => {
                console.log(error);
            }
        });
    }

    modifyThumbnailWithLink() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/post/modify/${modifyObj.tourId}/thumbnail/link`,
            contentType: 'application/json',
            dataType:'json',
            data: JSON.stringify({
                "link" : thumbnailUrl
            }),
            success: response => {
                alert("링크로 썸네일 등록 완료!");
            },
            error: error => {
                console.log(error);
            }
        });
    }

    modifyMainImg() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/post/modify/${modifyObj.tourId}/mainimg`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: mainImgObj.formData,
            dataType: 'json',
            success: response => {
                alert("메인이미지 파일 등록 완료!");
                location.reload();
            },
            error: error => {
                console.log(error);
            }
        });
    }

    modifyMainImgWithLink() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/post/modify/${modifyObj.tourId}/mainimg/link`,
            contentType: 'application/json',
            dataType:'json',
            data: JSON.stringify({
                "link" : mainImageUrl
            }),
            success: response => {
                alert("링크로 메인이미지 등록 완료!");
                location.reload();
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
            url: `/api/post/${modifyObj.categoryId}/tags`,
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
class ModifyService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyService();
        };
        return this.#instance;
    }

    loadPage() {
        let url = location.href; 
        let subUrl = url.substring(url.lastIndexOf("/")+1);
        
        modifyObj.tourId = subUrl;
        
        principalData = PrincipalApi.getInstance().getPrincipal();
        const responseData = ModifyApi.getInstance().getPost();
        
        modifyObj.categoryId = responseData.data.categoryId;

        this.loadCategories();
        ComponentEvents.getInstance().addChangeEventCategorySelector();
        const categorySelector = document.querySelector(".category-selector");
        categories.forEach((category,index) => {
            if(category.categoryId == responseData.data.categoryId) {
                categorySelector.selectedIndex = index;
            }
        });
        
        console.log(principalData);
        console.log(responseData);

        if(responseData == null) {
            alert("존재하지 않는 게시글입니다.");
            window.location.href='http://www.localhost:8000/';
        }
        
        if(responseData.data.thumbnailImage != null) {
            if(responseData.data.thumbnailImage.indexOf("thumbnail") < 0){
                const formThumbnail = document.querySelector(".thumbnail-with-form");
                formThumbnail.classList.add("off");
                const linkThumbnail = document.querySelector(".thumbnail-with-link");
                linkThumbnail.classList.remove("off");
                thumbnailFormFlag = false;
                
                let thumbnailLinkInput = document.querySelector(".thumbnail-link");
                thumbnailLinkInput.value = responseData.data.thumbnailImage;
            }
        }

        if(responseData.data.mainImage != null) {
            if(responseData.data.mainImage.indexOf("mainimage") < 0) {
                const formMainImage = document.querySelector(".mainimg-with-form");
                formMainImage.classList.add("off");
                const linkMainImage = document.querySelector(".mainimg-with-link");
                linkMainImage.classList.remove("off")
                mainImageFormFlag = false;

                let mainImgLinkInput = document.querySelector(".mainimg-link");
                mainImgLinkInput.value = responseData.data.mainImage;
            }
        }

        let thumbnail = document.querySelector('.thumbnail');
        let mainImage = document.querySelector(".mainimg");
        let mainTitle = document.querySelector(".main-title");
        let subTitle = document.querySelector(".sub-title");
        let contentArea = document.querySelector(".note-editable");
        let homepageInput = document.querySelector(".homepage-input");
        let numberInput = document.querySelector(".number-input");
        let holidayInput = document.querySelector(".offday-input");
        let runtimeInput = document.querySelector(".runtime-input");
        let usingfeeInput = document.querySelector(".usingfee-input");
        let mainmenuInput = document.querySelector(".mainmenu-input");
        let convenientInput = document.querySelector(".convenient-input");
        let otherInput = document.querySelector(".other-input");
        let trafficInput = document.querySelector(".traffic-input");
        
        // `http://localhost:8000/image/book/${responseData.bookImage.saveName}`;
        
        if(thumbnailFormFlag && responseData.data.thumbnailImage != null) {
            thumbnail.src = `http://localhost:8000/image/${responseData.data.thumbnailImage}`;
        }
        if(mainImageFormFlag && responseData.data.mainImage != null) {
            mainImage.src = `http://localhost:8000/image/${responseData.data.mainImage}`;
        }

        mainTitle.value = responseData.data.title;
        subTitle.value = responseData.data.subtitle;
        contentArea.innerHTML = responseData.data.contents;
        homepageInput.value = responseData.data.homepageUrl;
        numberInput.value = responseData.data.tellNumber;
        holidayInput.value = responseData.data.holidayInfo;
        runtimeInput.value = responseData.data.usageDayAndTime;
        usingfeeInput.value = responseData.data.usageAmount;
        mainmenuInput.value = responseData.data.mainMenu;
        convenientInput.value = responseData.data.handicappedArea;
        otherInput.value = responseData.data.etcInfo;
        trafficInput.value = responseData.data.trafficInfo;

    }

    loadCategories() {
        categories = ModifyApi.getInstance().getCategories().data;
        if(categories != null) {
            const categorySelector = document.querySelector(".category-selector");
            categories.forEach(data => {  
                categorySelector.innerHTML += `
                    <option value="${data.categoryId}">${data.categoryName}</option>
                `;
            });
        }
        this.loadTags();
    }


    loadTags() {
        tags = ModifyApi.getInstance().getTags().data;
        let tagSelectorContainer = document.querySelector(".tags-selector-container");
        tourTags = ModifyApi.getInstance().getPostTag().data;
        tagSelectorContainer.innerHTML = `
            <h2>태그선택(중복가능)</h2>
        `;
        for(let i = 0; i < 30; i ++) {
            tagIdList.pop();
        }

        tags.forEach(tag => {
            tagIdList.push(tag.tagId);
            if(tourTags.includes(tag.tagId)) {
                tagSelectorContainer.innerHTML += `
                <input type="checkbox" class="tag-check" style="display:none;" checked=true>
                <li class="tag-button selected">#${tag.tagName}</li>
                `;
            } else {
                tagSelectorContainer.innerHTML += `
                <input type="checkbox" class="tag-check" style="display:none;">
                <li class="tag-button">#${tag.tagName}</li>
                `;
            }
        });
        ComponentEvents.getInstance().clickTagButton();
    }

    modifyPost() {
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

        
        modifyObj.tourTitle = mainTitle.value;
        modifyObj.tourSubTitle = subTitle.value;
        modifyObj.tourContents = $('#summernote').summernote('code');
        modifyObj.usageHomepage = homepageInput.value;
        modifyObj.usageNumber = numberInput.value;
        modifyObj.usageOffDay = holidayInput.value;
        modifyObj.usageRuntime = runtimeInput.value;
        modifyObj.usageUsingFee = usingfeeInput.value;
        modifyObj.usageMainMenu = mainmenuInput.value;
        modifyObj.usageConvenient = convenientInput.value;
        modifyObj.usageOther = otherInput.value;
        modifyObj.usageTraffic = trafficInput.value;
        thumbnailUrl = thumbnailLink.value;
        mainImageUrl = mainImageLink.value;

        ModifyApi.getInstance().modifyPost();
        ModifyApi.getInstance().deletePostTags();
        
        const tagCheck = document.querySelectorAll(".tag-check");
        tagCheck.forEach((check,index) => {
            if(check.checked) {
                tagList.push(tagIdList[index]);
            }
        });
        
        if(tagList.length > 0) {
            ModifyApi.getInstance().modifyPostTags();
        } else {
            alert("태그 등록 없이 게시글 등록.");
        }

        if(thumbnailFormFlag) {
            if(thumbnailObj.files[0] == null) {
                alert("썸네일 이미지가 없습니다!");
            } else {
                thumbnailObj.formData.append("files", thumbnailObj.files[0]);
                ModifyApi.getInstance().modifyThumbnail();
            }
        } else {
            ModifyApi.getInstance().modifyThumbnailWithLink();
        }
        
        if(mainImageFormFlag) {
            if(mainImgObj.files[0] == null) {
                alert("메인이미지가 없습니다!");
                location.reload();
            } else {
                mainImgObj.formData.append("files", mainImgObj.files[0]);
                ModifyApi.getInstance().modifyMainImg();
            }
        } else {
            ModifyApi.getInstance().modifyMainImgWithLink();
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

    getContentButton() {
        let getContentButton = document.querySelector(".get-content-button");
        
        getContentButton.onclick = () => {
            ModifyService.getInstance().loadPage();
        }
    };

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
                console.log("썸네일 링크태그 활성화");
            }else {
                thumbnailFormFlag = true;
                formThumbnail.classList.remove("off");
                linkThumbnail.classList.add("off");
                console.log("썸네일 폼태그 활성화");
            }
        }

        mainImageToggle.onclick = () => {
            if(mainImageFormFlag == true) {
                mainImageFormFlag = false;
                formMainImage.classList.add("off");
                linkMainImage.classList.remove("off");
                console.log("메인이미지 링크태그 활성화");
            }else {
                mainImageFormFlag = true;
                formMainImage.classList.remove("off");
                linkMainImage.classList.add("off");
                console.log("메인이미지 폼태그 활성화");
            }
        }
    } 

    clickModifyButton() {
        const modifyButton = document.querySelector(".modify-button");

        modifyButton.onclick = () => {
            ModifyService.getInstance().modifyPost();
        }
    }

    addChangeEventThumbnailFile() {
        const thumbnailFile = document.querySelector(".thumbnail-file");
        thumbnailFile.onchange = () => {
            const formData = new FormData(document.querySelector(".thumbnail-form"));
            let changeFlag = false;

            thumbnailObj.files.pop();
            console.log(formData);
            
            formData.forEach(value => {
                console.log("1");
                if(value.size != 0) {
                    thumbnailObj.files.push(value);
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                ModifyService.getInstance().getThumbnailPreview();
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
                ModifyService.getInstance().getMainImgPreview();
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
            modifyObj.categoryId = categorySelector.options[categorySelector.selectedIndex].value;
            ModifyService.getInstance().loadTags();
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
