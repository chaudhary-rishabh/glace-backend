import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
        razorpayOrderId: { type: String, required: true },
        razorpayPaymentId: { type: String },
        amount: { type: Number, required: true },
        status: { type: String, enum: ["pending", "completed"], default: "pending" },
    },
    { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);