const agreeChecked = document.querySelector(".agree-check");
const nextPageButton = document.querySelector(".agreeNextPage");

nextPageButton.onclick = () => {
    if (agreeChecked.checked == false) {
        alert("동의하셔야합니다");
    } else {
        alert("회원가입 페이지로 이동합니다")
        window.location.href = '';
        window.location.href = 'http://localhost:8000/account/register';
    }
}