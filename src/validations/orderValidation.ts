import { z } from "zod";

export const createOrderSchema = z.object({
    productIds: z.array(z.string()).min(1, "At least one product is required"),
});

export const updateOrderStatusSchema = z.object({
    status: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
});