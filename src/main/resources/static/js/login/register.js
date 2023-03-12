window.onload = () => {
    // PrincipalApi.getInstance().getPrincipal();
    RegisterEvent.getInstance().addRegisterSubmitOnclickEvent();
    HeaderService.getInstance().loadHeader();
    FooterService.getInstance().loadFooter();
    RegisterService.getInstance().addEventToUsernameInput();
    RegisterService.getInstance().addEventToPasswordInput();
    RegisterService.getInstance().addEventToRegisterInput();
    ComponentEvent.getInstance().addClickEventSearchButton();
}

class RegisterApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new RegisterApi();
        }
        return this.#instance;
    }

    duplicateUsername(username) {
        const usernameInput = document.querySelectorAll('.register-error-text');
        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/account/username",
            // url: "api/account/username",
            data: { "username": username },
            dataType: "json",
            success: (response) => {
                usernameInput[0].textContent = "사용이 가능한 아이디 입니다.";
                // alert("사용이 가능한 아이디 입니다");
            },
            error: (error) => {
                console.log(error);
                usernameInput[0].textContent = error.responseJSON.data.username;
            }
        })
    }
    /*
    회원가입
    */
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
                window.location.href = 'http://localhost:8000/account/login';
            },
            error: error => {
                console.log(error);
                alert("회원가입 실패 공백란을 다시 입력해주세요.");
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
    setErrorMessage(errors) {
        const registerError = document.querySelectorAll(".register-error");
        // 
        this.#clearErrorMessage();

        Object.keys(errors).forEach(error => {
            if (error == "username") {
                registerError[0].textContent = errors[error];
            } else if (error == "password") {
                registerError[1].textContent = errors[error];
            } else if (error == "repassword") {
                registerError[2].textContent = errors[error];
            } else if (error == "name") {
                registerError[3].textContent = errors[error];
            } else if (error == "birth") {
                registerError[4].textContent = errors[error];
            } else if (error == "email") {
                registerError[5].textContent = errors[error];
            } else if (error == "tellNumber") {
                registerError[6].textContent = errors[error];
            }
        });

    }


    // 에러에서 벗어날때 
    #clearErrorMessage() {
        const registerError = document.querySelectorAll(".register-error");
        registerError.forEach(error => {
            error.textContent = "";
        })
    }

    addEventToUsernameInput() {
        const usernameInput = document.querySelectorAll('.register-input-username')[0];
        usernameInput.onblur = () => {
            RegisterApi.getInstance().duplicateUsername(usernameInput.value);
        }
    }

    addEventToPasswordInput() {
        const usernameInput = document.querySelectorAll('.register-input-username');
        const passwordInput = document.querySelector('.register-input-password');
        const repasswordInput = document.querySelector('.register-input-repassword');
        const errorBox = document.querySelectorAll('.register-error');
        const errorimg = document.querySelectorAll('.pswdImg');
        usernameInput.onblur = () => {
            if ((usernameInput.value).length > 4) {
                errorBox[0].textContent = "";
            } else {
                errorBox[0].textContent = "4자 이상 아이디를 작성해주세요";
            }
        }

        passwordInput.onblur = () => {
            var password = $("#password").val();
            var username = $("#id").val();

            var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;
            var hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

            if (false === reg.test(password)) {
                errorBox[1].textContent = ('비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다');
            } else if (/(\w)\1\1\1/.test(password)) {
                errorBox[1].textContent = ('같은 문자를 4번 이상 사용하실 수 없습니다');
                return false;
                // } else if (password.search(username) > -1) {
                //     errorBox[1].textContent =("비밀번호에 아이디가 포함되었습니다.");
                //     return false;
            } else if (password.search(/\s/) != -1) {
                errorBox[1].textContent = ("비밀번호는 공백 없이 입력해주세요");
                return false;
            } else if (hangulcheck.test(password)) {
                errorBox[1].textContent = ("비밀번호에 한글을 사용 할 수 없습니다");
            } else {
                errorBox[1].textContent = ("사용 가능한 패스워드 입니다");
            }

        }

        repasswordInput.onblur = () => {
            if (repasswordInput.value != passwordInput.value) {
                errorBox[1].textContent = "비밀번호가 동일하지 않습니다";
                errorBox[2].textContent = "비밀번호가 동일하지 않습니다";
            } else {
                // errorBox[1].textContent = "비밀번호를 사용할 수 있습니다.";
                errorBox[1].textContent = "";
                errorBox[2].textContent = "비밀번호가 일치합니다";
                // errorimg.classList.toggle(".pswdImg.on");
            }
        }
    }

    addEventToRegisterInput() {
        const nameInput = document.querySelector('.register-input-name');
        const birthInput = document.querySelector('.register-input-birth');
        const emailInput = document.querySelector('.register-input-email');
        const phoneInput = document.querySelector('.register-input-tellNumber');
        const errorBox = document.querySelectorAll('.register-error');
        nameInput.onblur = () => {
            if ((nameInput.value).length > 1) {
                errorBox[3].textContent = "";
            } else {
                errorBox[3].textContent = "올바른 성함을 다시 한번 확인해주세요";
            }
        }
        birthInput.onblur = () => {
            if ((birthInput.value).length > 5) {
                errorBox[4].textContent = "";
            } else {
                errorBox[4].textContent = "올바른 생년월일을 다시 한번 확인해주세요";
            }
        }
        phoneInput.onblur = () => {
            if ((phoneInput.value).length > 10 && (phoneInput.value.includes('010'))) {
                errorBox[6].textContent = "";
            } else {
                errorBox[6].textContent = "올바른 핸드폰번호를 다시 한번 확인해주세요";
            }
        }
        emailInput.onblur = () => {
            if (emailInput.value.includes('@') && emailInput.value.includes('.com')) {
                errorBox[5].textContent = "";
            } else {
                errorBox[5].textContent = "올바른 이메일 주소를 입력하세요";
            }
        }
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
            getLocation();

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                }
            }

            function showPosition(position) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                // 지금은 무조건 value값을 lat,lng을 받고, if문을 통하여 값 전달 = (1일때만)
                if (document.querySelector(".register-input-location-lng").value == 1) {
                    document.querySelector(".register-input-location-lng").value == lat;
                } else {
                    document.querySelector(".register-input-location-lng").value == 0;
                };

                if (document.querySelector(".register-input-location-lat").value == 1) {
                    document.querySelector(".register-input-location-lat").value == lat;
                } else {
                    document.querySelector(".register-input-location-lat").value == 0;
                };

                // reigster value값 
                const usernameValue = document.querySelector(".register-input-username").value;
                // const subscriptionValue = document.querySelector(".register-input-subscription").value;
                const passwordValue = document.querySelector(".register-input-password").value;
                const repasswordValue = document.querySelector(".register-input-repassword").value;
                const nameValue = document.querySelector(".register-input-name").value;
                const birthValue = document.querySelector(".register-input-birth").value;
                const genderValue = document.querySelector(".register-input-gender").value;
                const emailValue = document.querySelector(".register-input-email").value;
                const tellNumberValue = document.querySelector(".register-input-tellNumber").value;
                const locationLatValue = lat;
                const locationLngValue = lng;
                const marketingValue = document.querySelector(".register-input-marketing").value;

                const user = new User(
                    usernameValue
                    // , subscriptionValue
                    , passwordValue
                    , repasswordValue
                    , nameValue
                    , birthValue
                    , genderValue
                    , emailValue
                    , tellNumberValue
                    , locationLatValue
                    , locationLngValue
                    , marketingValue);

                RegisterApi.getInstance().register(user);
            }
        }
    }
}
// const principal = PrincipalApi.getInstance().getPrincipal();
// console.log(`${principal.userMst.roleDtl.roleId}`);
class User {
    username = null;
    // roleId = null;
    password = null;
    repassword = null;
    name = null;
    gender = null;
    birth = null;
    email = null;
    tellNumber = null;
    userLat = null;
    userLng = null;
    userMarketing = null;


    constructor(username, password, repassword, name, birth, gender, email, tellNumber, userLat, userLng, userMarketing) {
        this.username = username;
        // this.roleId = roleId;
        this.password = password;
        this.repassword = repassword;
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.email = email;
        this.tellNumber = tellNumber;
        this.userLat = userLat;
        this.userLng = userLng;
        this.userMarketing = userMarketing;
    }
}