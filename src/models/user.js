import mongoose from "mongoose";

const User = new mongoose.model("user", new mongoose.Schema({
    password: String,
    email: String,
}, { collection: "users" }));

export { User };