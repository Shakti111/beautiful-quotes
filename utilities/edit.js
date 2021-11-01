const changeBtn = document.querySelector(".back");
if (!localStorage.getItem("dark")) {
    document.body.classList.remove("dark");
    changeBtn.setAttribute("src", "/arrow_back_dark.svg");
} else {
    document.body.classList.add("dark");
    changeBtn.setAttribute("src", "/arrow_back_white.svg");
}
