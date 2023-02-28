const username = document.querySelector("#username");
const email = document.querySelector("#email");
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  if (username.value == "") {
    label = username.nextElementSibling;
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
