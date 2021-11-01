const mainBtn = document.querySelector(".main");
const element = document.querySelector("span");
const upBtn = document.querySelector(".up-btn");
const checkBox = document.querySelector(".checkbox");

mainBtn.addEventListener("mouseenter", () => {
    element.classList.add("span");
});
mainBtn.addEventListener("mouseleave", () => {
    element.classList.remove("span");
});
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled > 250) {
        upBtn.classList.add("show");
    } else {
        upBtn.classList.remove("show");
    }
});
if (!localStorage.getItem("dark")) {
    document.body.classList.remove("dark");
    checkBox.checked = false;
} else {
    document.body.classList.add("dark");
    checkBox.checked = true;
}

checkBox.addEventListener("change", () => {
    if (!localStorage.getItem("dark")) {
        document.body.classList.add("dark");
        localStorage.setItem("dark", "true");
    } else {
        document.body.classList.remove("dark");
        localStorage.removeItem("dark");
    }
});
