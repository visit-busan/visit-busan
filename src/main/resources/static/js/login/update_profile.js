const name = document.querySelector("#name"); //name으로 사용시 사용할수없다고해서 Name으로 대체
const tellNumber = document.querySelector("#tellNumber");
const email = document.querySelector("#email");

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
  } else if (email.value == "") {
    label = email.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  }
});

window.onload = () => {
  HeaderService.getInstance().loadHeader();
  HeaderService.getInstance().Categoryload();
  FooterService.getInstance().loadFooter();
  UpdateProfileApi.getInstance().loadInputValue();
  ComponentEvent.getInstance().clickUpdateProfile();
}

let updateProfileObj = {
  userId: null,
  name: "",
  tellNumber: "",
  email: "",
}

class UpdateProfileApi {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new UpdateProfileApi();
    }
    return this.#instance;
  }

  loadInputValue() {
    const principal = PrincipalApi.getInstance().getPrincipal();
    const nameContainer = document.querySelector(".area-name");
    const tellNumberContainer = document.querySelector(".area-tellNumber");
    const eamilContainer = document.querySelector(".area-email");
    console.log(principal.userMst.userId);
    updateProfileObj.userId = principal.userMst.userId;
    nameContainer.innerHTML = `
    <input type="text" name="name" id="name" autocomplete="off" required value="${principal.userMst.name}"><label for="name">사용자 이름</label>
    `;
    tellNumberContainer.innerHTML = `
    <input type="tel" name="tellNumber" id="tellNumber" autocomplete="off" required value="${principal.userMst.tellNumber}"><label for="tellNumber">핸드폰 번호</label>
    `;
    eamilContainer.innerHTML = `
    <input type="email" name="email" id="email" autocomplete="off" required value="${principal.userMst.email}"><label for="email">사용자 이메일</label>
    `;

  }

  updateProfile() {
    $.ajax({
      async: false,
      type: "patch",
      url: "/api/account/update/profile",
      contentType: "application/json",
      data: JSON.stringify(updateProfileObj),
      dataType: "json",
      success: response => {
        alert("회원정보 수정완료.");
        alert("로그아웃후 변경사항을 확인해주세요");
        window.location.href = "";
        window.location.assign('http://localhost:8000/logout');
      },
      error: error => {
        console.log(error);
        alert("입력양식을 다시 확인해주세요.");
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

  clickUpdateProfile() {
    let submitButton = document.querySelector("#btn");



    submitButton.onclick = () => {
      let name = document.querySelector("#name");
      let tellNumber = document.querySelector("#tellNumber");
      let email = document.querySelector("#email");

      console.log("입력된 회원의 이름: " + name.value);
      console.log("입력된 회원의 전화번호: " + tellNumber.value);
      console.log("입력된 회원의 이메일: " + email.value);

      updateProfileObj.name = name.value;
      updateProfileObj.tellNumber = tellNumber.value;
      updateProfileObj.email = email.value;
      UpdateProfileApi.getInstance().updateProfile();
    }
  }
}
