import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        plan: { type: String, enum: ["basic", "premium"], required: true },
        payment: { type: Schema.Types.ObjectId, ref: "Payment" },
        expiry: { type: Date, required: true },
    },
    { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);