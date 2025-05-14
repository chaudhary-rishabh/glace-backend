import mongoose, { Schema } from "mongoose";

const ingredientSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
}, { timestamps: true });

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);