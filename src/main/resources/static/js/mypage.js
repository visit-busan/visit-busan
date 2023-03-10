window.onload = () => {
    HeaderService.getInstance().loadHeader();
    FooterService.getInstance().loadFooter();
    MypageService.getInstance().loadMypage();
}
window.onclick = () => {
    MypageService.getInstance().clickDeleteButton();
    // MypageService.getInstance().deleteUser();
    }

    class ComponentEvent {
        static #instance = null;
        static getInstance() {
            if (this.#instance == null) {
                this.#instance = new ComponentEvent();
            }
            return this.#instance
        }
    }