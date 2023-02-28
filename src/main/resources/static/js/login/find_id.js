const name = document.querySelector("#name");
const birth = document.querySelector("#birth");
const email = document.querySelector("#email");
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  if (name.value == "") {
    label = name.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  } else if (birth.value == "") {
    label = birth.nextElementSibling;
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
