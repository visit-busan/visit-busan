window.onload = () => {

}

const searchObj = {
    page : 1,
    category : "",
    searchValue : "",
    order : "tourId",
    limit : "Y",
    count : 20
}

class TourSearchApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new TourSearchApi();
        }

        return this.#instance;
    }

    tourList(searchObj) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/tours/list",
            data : searchObj,
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error : error => {
                console.log(error);
            }
        });
        return returnData;
    }

    getTourTotalCount(searchObj) {
        let returnData = null;

        $.ajax ({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/tours/totalcount",
            data: {
                "category" : searchObj.category,
                "searchValue" : searchObj.searchValue
            },
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error : error => {
                console.log(error);
            }
        });
        return returnData;
    }

    getCategories(searchObj) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/tour_category",
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error : error => {
                console.log(error);
            }
        });
        return returnData;
    }

    deleteTours(deleteArray) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: "http://localhost:8000/api/admin/tours",
            contentType: "application/json",
            data: JSON.stringify({
                    userIds: deleteArray
                }
            ),
            
        })
    }
}