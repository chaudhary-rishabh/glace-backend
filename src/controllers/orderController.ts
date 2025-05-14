import { Request, Response, NextFunction } from "express";
import { Order } from "../models/Order";
import { createOrderSchema, updateOrderStatusSchema } from "../validations/orderValidation";

interface AuthRequest extends Request {
    user?: any;
}

export const placeOrder = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.errors });
        return;
    }

    const order = new Order({
        user: req.user._id,
        products: parsed.data.productIds,
    });
    await order.save();
    res.status(201).json(order);
};

export const getOrders = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const filter = req.user.role === "Admin" ? {} : { user: req.user._id };
    const orders = await Order.find(filter).populate("user products payment");
    res.json(orders);
};

export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = updateOrderStatusSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.errors });
        return;
    }

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: parsed.data.status },
        { new: true }
    );
    if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
    }
    res.json(order);
};