import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Order } from "../models/Order";
import { User } from "../models/User";
import { Product } from "../models/Product";

export const getDashboard = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const stats = {
            totalOrders: await Order.countDocuments(),
            totalUsers: await User.countDocuments(),
            totalProducts: await Product.countDocuments(),
        };
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orders = await Order.find().populate('user', 'email');
        res.json(orders);
    } catch (error) {
        next(error);
    }
};