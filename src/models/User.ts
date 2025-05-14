import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
    email: string;
    password: string;
    role: "Admin" | "Buyer";
    subscriptionStatus: boolean;
    subscriptionExpiry?: Date;
    orderHistory: mongoose.Types.ObjectId[];
    reviews: mongoose.Types.ObjectId[];
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["Admin", "Buyer"], default: "Buyer" },
        subscriptionStatus: { type: Boolean, default: false },
        subscriptionExpiry: { type: Date },
        orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);