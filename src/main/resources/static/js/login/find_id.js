const name = document.querySelector("#name");
const tellNumber = document.querySelector("#tellNumber");
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  if (name.value == "") {
    label = name.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  } else if (tellNumber.value == "") {
    label = tellNumber.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  }
});

window.onload = () => {
  ComponentEvent.getInstance().clickFindId();
  HeaderService.getInstance().loadHeader();
  FooterService.getInstance().loadFooter();
  ComponentEvent.getInstance().addClickEventSearchButton();
}

let findIdObj = {
  name: "",
  tellNumber: "",
}

class FindIdApi {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new FindIdApi();
    }
    return this.#instance;
  }

  findId() {
    $.ajax({
      async: false,
      type: "post",
      url: "http://localhost:8000/api/account/find/username",
      contentType: "application/json",
      data: JSON.stringify(findIdObj),
      dataType: "json",
      success: response => {
        alert("회원님의 아이디는: " + response.data + "입니다");
        alert("로그인 사이트로 이동합니다.");
        window.location.href = 'http://localhost:8000/account/login';

      },
      error: error => {
        console.log(error);
        alert("입력한 데이터와 동일한 사용자 계정을 찾을수 없습니다");
      }
    })
  }
}

class ComponentEvent {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new ComponentEvent();
    }
    return this.#instance;
  }

  clickFindId() {
    let submitButton = document.querySelector("#btn");



    submitButton.onclick = () => {
      let name = document.querySelector("#name");
      let tellNumber = document.querySelector("#tellNumber");

      console.log("입력된 회원의 이름: " + name.value);
      console.log("입력된 회원의 전화번호: " + tellNumber.value);

      findIdObj.name = name.value;
      findIdObj.tellNumber = tellNumber.value;
      FindIdApi.getInstance().findId();
    }
  }
}