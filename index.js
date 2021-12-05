import express from "express";
import path from "path";
import methodOverride from "method-override";
import { Quote } from "./models/quotes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "utilities")));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    const allQuotes = await Quote.find({});
    res.render("home", { allQuotes });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/", async (req, res) => {
    const { userName, userQuote } = req.body;
    const newQuote = await new Quote({
        userName,
        userQuote,
    });
    newQuote.save();
    res.redirect("/");
});

app.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const found = await Quote.findById(id);
    res.render("edit", { found });
});

app.patch("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const editedQuote = req.body.userQuote;

    const found = await Quote.findByIdAndUpdate(id, { userQuote: editedQuote });
    res.redirect("/");
});

app.delete("/:id/delete", async (req, res) => {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`);
});
