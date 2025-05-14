import mongoose, { Schema } from "mongoose";

const fnq = new Schema(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    }, { timestamps: true }
);

export const Fnq = mongoose.model("Fnq", fnq);