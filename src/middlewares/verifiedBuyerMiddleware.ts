import { Request, Response, NextFunction } from "express";
import { Order } from "../models/Order";

interface AuthRequest extends Request {
    user?: any;
}

export const verifiedBuyerMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { productId } = req.body;
    const userId = req.user?._id;

    const order = await Order.findOne({ user: userId, products: productId, status: "Delivered" });
    if (!order) {
        res.status(403).json({ message: "Only verified buyers can review" });
        return;
    }
    next();
};