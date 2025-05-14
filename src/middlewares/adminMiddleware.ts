import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: any;
}

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== "Admin") {
        res.status(403).json({ message: "Admin access required" });
        return;
    }
    next();
};