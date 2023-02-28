const username = document.querySelector("#username");
const password = document.querySelector("#password");
const repassword = document.querySelector("#repassword");
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  if (username.value == "") {
    label = username.nextElementSibling;
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
  } else if (repassword.value == "") {
    label = repassword.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  }
});
