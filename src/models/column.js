import mongoose from "mongoose";

const Column = new mongoose.model("column", new mongoose.Schema({
    id: String,
    title: String,
    index: Number,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "item"
    }],
    broad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "broad"
    },
}, { collection: "columns", strictPopulate: false }));

export { Column };