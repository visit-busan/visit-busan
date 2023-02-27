window.onload = () => {
    ComponentEvents.getInstance().getContentButton();
    ModifyService.getInstance().getContent();
}

class ModifyService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModifyService();
        };
        return this.#instance;
    }

    getContent() {
        let contentArea = document.querySelector(".note-editable");
        contentArea.innerHTML = `
            <div class="note-editable" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="true" autocorrect="true" style="height: 1500px;"><p><img style="width: 25%;" src="/image/post/d824ad98880b403b8b312b214ab78029.jpg">&nbsp;이글에 대해서는</p><p><br></p><p>fadfjoiaejfjaoidjfaspdf</p><p>aoiefjosiadjfoiasej</p><p><img style="width: 251px;" src="/image/post/6324c9c269844046a7db130984b5563f.png"></p><p>flkadjfoiasdjfoiajsdf</p><p>adsofijaosidfjiadpsj</p></div>
        `;
    }
}

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
            ModifyService.getInstance().getContent();
        }
    };
}
