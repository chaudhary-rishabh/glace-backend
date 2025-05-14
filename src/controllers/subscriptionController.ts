import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Subscription } from "../models/Subscription";

export const subscribe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subscription = new Subscription({
            user: req.user._id,
            ...req.body
        });
        await subscription.save();
        res.status(201).json(subscription);
    } catch (error) {
        next(error);
    }
};