const name = document.querySelector("#name");
const username = document.querySelector("#username");
const tellNumber = document.querySelector("#tellNumber");

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  if (name.value == "") {
    label = name.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  } else if (username.value == "") {
    label = username.nextElementSibling;
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
  ComponentEvent.getInstance().clickFindPassword();
  HeaderService.getInstance().loadHeader();
  HeaderService.getInstance().Categoryload();
  FooterService.getInstance().loadFooter();
  ComponentEvent.getInstance().addClickEventSearchButton();
}

let findPasswordObj = {
  name: "",
  username: "",
  tellNumber: "",
}

class FindPasswordApi {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new FindPasswordApi();
    }
    return this.#instance;
  }

  findPassword() {
    $.ajax({
      async: false,
      type: "post",
      url: "http://localhost:8000/api/account/find/password",
      contentType: "application/json",
      data: JSON.stringify(findPasswordObj),
      dataType: "json",
      success: response => {
        console.log(response);
        // alert("회원의 암호화된 비밀번호는: "+response.data.password.value);
        alert(`사용자의 비밀번호를 변경합니다.`);
        alert("비밀번호 변경 사이트로 이동합니다.");
        window.location.href = 'http://localhost:8000/account/change/password';
        // window.location.assign("http://localhost:8000/account/change/password");
        // window.location.replace("http://localhost:8000/account/change/password");
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

  clickFindPassword() {
    let submitButton = document.querySelector("#btn");



    submitButton.onclick = () => {
      let name = document.querySelector("#name");
      let username = document.querySelector("#username");
      let tellNumber = document.querySelector("#tellNumber");

      console.log("입력된 회원의 이름: " + name.value);
      console.log("입력된 회원의 아이디: " + username.value);
      console.log("입력된 회원의 전화번호: " + tellNumber.value);

      findPasswordObj.name = name.value;
      findPasswordObj.username = username.value;
      findPasswordObj.tellNumber = tellNumber.value;
      FindPasswordApi.getInstance().findPassword();
    }
  }
}
