class MypageService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new MypageService();
        }
        return this.#instance;
    }

    loadMypage() {
        const box1 = document.querySelector(".box1");
        const box3 = document.querySelector(".box3");
        const principal = PrincipalApi.getInstance().getPrincipal();
        box1.innerHTML = `
            <i class="fa fa-user fa-4x"></i>
                <p>
                    <img src="/static/image/img_profile.png">
                    <span>${principal.userMst.name}</span>님 환영합니다.
                </p>
        `;
        box3.innerHTML = `
            <p>이름: ${principal.userMst.name}</p>
            <p>연락처: ${principal.userMst.tellNumber}</p>
            <p>이메일: ${principal.userMst.email}</p>
        `;

        $(".menu-container li").hover(
            function () {
                $("ul", this).stop().slideDown(200);
            },
            function () {
                $("ul", this).stop().slideUp(200);
            }
        );
    }

    deleteUser() {
        const principal = PrincipalApi.getInstance().getPrincipal();
        const userId = `${principal.userMst.userId}`;
        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/account/delete/${userId}`,
            dataType: "json",
            success: (response) => {
                console.log(response);
                alert("회원탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
                window.location.href = `http://localhost:8000/logout`;
            },
            error: (error) => {
                console.log(error);
                location.reload();
            },
        });
        return successFlag;
    }

    clickDeleteButton() {
        const principal = PrincipalApi.getInstance().getPrincipal();
        let deleteButton = document.querySelector('.delete-button');

        deleteButton.onclick = () => {
            if (confirm("정말로 회원을 탈퇴하시겠습니까?")) {
                var answer = prompt("본인 확인을 위하여 가입하신 회원님의 이메일를 입력해주시길 바랍니다.");
                if(answer == `${principal.userMst.email}`) {
                    this.deleteUser();
                }else {
                    alert("다시 시도해주세요.");
                    location.reload();
                }                
            } else {
                location.reload();
            }

        }
    }
}
