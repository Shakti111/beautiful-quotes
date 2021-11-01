const getPromise = async () => {
    try {
        return await axios.get("https://type.fit/api/quotes");
    } catch (error) {
        console.log(error);
    }
};
const getQuotes = async () => {
    const response = await getPromise();
    return response.data;
};

const quoteProvider = async () => {
    function setAttributes(el, attrs) {
        for (let key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
    const newQuotes = await getQuotes();
    for (let i = 0; i <= 4; i++) {
        const newForm = document.createElement("form");
        const newInput = document.createElement("input");
        const newText = document.createElement("textarea");
        const newBtn = document.createElement("button");
        setAttributes(newBtn, { class: "bg-b-e clr-black sec sec-1" });
        setAttributes(newInput, {
            type: "text",
            name: "userName",
            class: "ff-para ls-1",
        });
        setAttributes(newText, {
            class: "ff-para ls-1",
            style: "resize: none",
            name: "userQuote",
            cols: "30",
            rows: "5",
        });
        setAttributes(newForm, {
            class: "card card-sec",
            action: "/",
            method: "post",
        });
        let randNum = Math.floor(Math.random() * 1600 + 1);
        newInput.value = newQuotes[randNum].author;
        newText.value = newQuotes[randNum].text;
        newBtn.innerHTML = "ADD QUOTE";
        if (
            newQuotes[randNum].author !== null &&
            newQuotes[randNum].text !== null
        ) {
            newForm.append(newInput);
            newForm.append(newText);
            newForm.append(newBtn);
            wrapper.append(newForm);
        }
    }
};
const wrapper = document.querySelector(".wrapper");
const addBtn = document.querySelector("#addBtn");
const helperBtn = document.querySelector("#helperBtn");
const upBtn = document.querySelector(".up-btn");
const changeBtn = document.querySelector(".back");
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled > 514) {
        upBtn.classList.add("show");
    } else {
        upBtn.classList.remove("show");
    }
    if (scrolled > 700) {
        helperBtn.classList.add("show");
    } else {
        helperBtn.classList.remove("show");
    }
});

addBtn.addEventListener("click", quoteProvider);
helperBtn.addEventListener("click", quoteProvider);
if (!localStorage.getItem("dark")) {
    document.body.classList.remove("dark");
    changeBtn.setAttribute("src", "arrow_back_dark.svg");
} else {
    document.body.classList.add("dark");
    changeBtn.setAttribute("src", "arrow_back_white.svg");
}
