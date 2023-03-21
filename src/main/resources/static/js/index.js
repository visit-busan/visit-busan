window.onload = () => {
    HeaderService.getInstance().loadHeader();
    HeaderService.getInstance().Categoryload();
    FooterService.getInstance().loadFooter();
    IndexService.getInstance().Categoryload();
}

class IndexService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new IndexService();
        }
        return this.#instance
    }
    Categoryload() {
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: "/api/post/categories",
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {

            }
        })
        const category = document.querySelector(".category-option");
        responseData.forEach(data => {
            category.innerHTML +=
                `
                <option value="${data.categoryId}" style="width:100px; height:60px;">${data.categoryName}</option>
                 `;
        });
    }
}