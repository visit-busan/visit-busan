const id = document.querySelector("#username");
const pw = document.querySelector("#password");
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  if (id.value == "") {
    label = id.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  } else if (pw.value == "") {
    label = pw.nextElementSibling;
    label.classList.add("warning");
    setTimeout(() => {
      label.classList.remove("warning");
    }, 1500);
  }
});
