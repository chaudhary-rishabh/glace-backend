import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: any;
}

export const buyerMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role !== "Buyer") {
        res.status(403).json({ message: "Buyer access required" });
        return;
    }
    next();
};
