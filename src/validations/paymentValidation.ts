import { z } from "zod";

export const checkoutSchema = z.object({
    amount: z.number().positive("Amount must be positive"),
    orderId: z.string().min(1, "Order ID is required"),
});

export const verifyPaymentSchema = z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
});