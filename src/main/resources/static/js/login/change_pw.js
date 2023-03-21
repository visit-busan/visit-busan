const name = document.querySelector("#name");
const username = document.querySelector("#username");
const tellNumber = document.querySelector("#tellNumber");
const password = document.querySelector("#password");
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
  } else if (password.value == "") {
    label = password.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  }
});


window.onload = () => {
  ComponentEvent.getInstance().clickChangePassword();
  HeaderService.getInstance().loadHeader();
  HeaderService.getInstance().Categoryload();
  FooterService.getInstance().loadFooter();
  ComponentEvent.getInstance().addClickEventSearchButton();
}

let ChangePasswordObj = {
  name : "",
  username : "",
  tellNumber: "",
  password: "",
}

class ChangePasswordApi {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ChangePasswordApi();
    }
    return this.#instance;
  }

  changePassword() {
    
    $.ajax({
      async:false,
      type:"patch",
      url:"http://localhost:8000/api/account/change/password",
      contentType: "application/json",
      data: JSON.stringify(ChangePasswordObj),
      dataType: "json",
      success: response => {
        // console(response);
        // var a =  response.data.password;
        // a = sha256(password.value);
        // alert("회원의 변경된 비밀번호는: "+ response.data.password);
        alert("비밀번호 변경완료.");
        alert("로그인 페이지로 이동합니다");
        window.location.href = "";
        // window.location.href = 'http://localhost:8000/account/login';
        window.location.assign('http://localhost:8000/account/login');
        // window.location.replace('http://localhost:8000/account/login');
      },
      error: error => {
        console.log(error);
      }
    })
  }
}

class ComponentEvent {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ComponentEvent();
    }
    return this.#instance;
  }

  clickChangePassword() {
    let submitButton = document.querySelector("#btn");
    
    
    submitButton.onclick = () => {
      let name = document.querySelector("#name");
      let username = document.querySelector("#username");
      let tellNumber = document.querySelector("#tellNumber");
      let password = document.querySelector("#password");

      console.log("입력된 회원의 이름: " + name.value);
      console.log("입력된 회원의 아이디: " + username.value);
      console.log("입력된 회원의 전화번호: " + tellNumber.value);
      console.log("변경될 비밀번호: " + password.value);

      ChangePasswordObj.name = name.value;
      ChangePasswordObj.username = username.value;
      ChangePasswordObj.tellNumber = tellNumber.value;
      ChangePasswordObj.password = password.value;
      ChangePasswordApi.getInstance().changePassword();
    }
  }
}	