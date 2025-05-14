import mongoose, { Schema } from "mongoose";

const category = new Schema(
    {
        name: { type: String, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
        product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    }, { timestamps: true }
);

export const Category = mongoose.model("Category", category);