const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const axios = require("axios");
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "utilities")));

let userID = 4;
let allQuotes = [
    {
        userID: 1,
        userName: "John Lennon",
        userQuote: "Life is what happens when you’re busy making other plans.",
    },
    {
        userID: 2,
        userName: "Mae West",
        userQuote:
            "You only live once, but if you do it right, once is enough.",
    },
    {
        userID: 3,
        userName: "Thomas A. Edison",
        userQuote:
            "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
    },
];
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("home", { allQuotes });
});
app.get("/new", (req, res) => {
    res.render("new");
});
app.post("/", (req, res) => {
    const { userName, userQuote } = req.body;
    allQuotes.push({ userID, userName, userQuote });
    userID += 1;
    res.redirect("/");
});
app.get("/:userID/edit", (req, res) => {
    const { userID } = req.params;
    const found = allQuotes.find((c) => c.userID === parseInt(userID));
    res.render("edit", { found });
});
app.patch("/:userID/edit", (req, res) => {
    const { userID } = req.params;
    const editedQuote = req.body.userQuote;
    const found = allQuotes.find((c) => c.userID === parseInt(userID));
    found.userQuote = editedQuote;
    res.redirect("/");
});
app.delete("/:userID/delete", (req, res) => {
    const { userID } = req.params;
    const found = allQuotes.find((c) => c.userID === parseInt(userID));
    allQuotes = allQuotes.filter((c) => c.userID !== found.userID);
    res.redirect("/");
});
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`);
});
