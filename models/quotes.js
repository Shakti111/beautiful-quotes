import mongoose from "mongoose";
const { Schema } = mongoose;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/Quote";

mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Mongoose connection established!");
    })
    .catch((err) => console.log(err));

const quoteSchema = new Schema({
    userName: String,
    userQuote: String,
});

export const Quote = mongoose.model("Quote", quoteSchema);
