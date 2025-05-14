import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered"],
            default: "pending",
        },
        payment: { type: Schema.Types.ObjectId, ref: "Payment" },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);