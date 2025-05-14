import { Request, Response, NextFunction } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/Payment";
import { checkoutSchema, verifyPaymentSchema } from "../validations/paymentValidation";
import { Order } from "../models/Order";
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

interface AuthRequest extends Request {
    user?: any;
}

export const checkout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = checkoutSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.errors });
        return;
    }

    const { amount, orderId } = parsed.data;

    try {
        const options = {
            amount: amount * 100, // Convert to paise (Razorpay uses smallest currency unit)
            currency: "INR",
            receipt: orderId,
        };

        const razorpayOrder = await razorpay.orders.create(options);
        const payment = new Payment({
            order: orderId,
            razorpayOrderId: razorpayOrder.id,
            amount,
            status: "Pending",
        });
        await payment.save();

        res.json({
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            key: process.env.RAZORPAY_KEY_ID, // Send key to frontend for Razorpay checkout
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create Razorpay order", error });
    }
};

export const verifyPayment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = verifyPaymentSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.errors });
        return;
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { razorpayPaymentId: razorpay_payment_id, status: "Completed" },
            { new: true }
        );

        if (!payment) {
            res.status(404).json({ message: "Payment not found" });
            return;
        }

        // Optionally update the associated order status
        await Order.findByIdAndUpdate(payment.order, { status: "Shipped" });

        res.json({ message: "Payment verified successfully", payment });
    } else {
        res.status(400).json({ message: "Invalid payment signature" });
    }
};