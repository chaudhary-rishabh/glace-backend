import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: { type: String, required: true, index: true },
        description: { type: String },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);