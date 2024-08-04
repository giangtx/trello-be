import mongoose from "mongoose";

const Item = new mongoose.model("item", new mongoose.Schema({
    id: String,
    content: String,
    column: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "column"
    },
    status: String,
    index: Number,
}, { collection: "items", strictPopulate: false }));

export { Item };