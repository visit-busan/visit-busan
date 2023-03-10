// 회원가입 로직
window.onload = () => {
    RegisterEvent.getInstance().addRegisterSubmitOnclickEvent();
}

class RegisterApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new RegisterApi();
        }
        return this.#instance;
    }

    register(user) {
        $.ajax({
            async: false,
            type: "post",
            url: "/api/account/register",
            contentType: "application/json",
            data: JSON.stringify(user),
            dataType: "json",
            success: response => {
                console.log(response);
                alert("회원가입 성공!");
                window.location.href = 'http://www.localhost:8000/';
            },
            error: error => {
                console.log(error);
            }
        });
    }
}


class RegisterService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new RegisterService();
        }
        return this.#instance;
    }
}


class RegisterEvent {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new RegisterEvent();
        }
        return this.#instance;
    }

    addRegisterSubmitOnclickEvent() {
        const registerSubmit = document.querySelector("#btnJoin");

        registerSubmit.onclick = () => {
            const usernameValue = document.querySelector(".register-input-username").value;
            const passwordValue = document.querySelector(".register-input-password").value;
            const nameValue = document.querySelector(".register-input-name").value;
            const birthValue = document.querySelector(".register-input-birth").value;
            const genderValue = document.querySelector(".register-input-gender").value;
            const emailValue = document.querySelector(".register-input-email").value;
            const tellNumberValue = document.querySelector(".register-input-tellNumber").value;

            console.log(emailValue);
            const user = new User(usernameValue, passwordValue, nameValue, birthValue, genderValue, emailValue, tellNumberValue);
            // 

            RegisterApi.getInstance().register(user);
        }
    }
}

class User {
    username = null;
    password = null;
    name = null;
    gender = null;
    birth = null;
    email = null;
    tellNumber = null;


    constructor(username, password, name, birth, gender, email, tellNumber) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.email = email;
        this.tellNumber = tellNumber;
    }
}