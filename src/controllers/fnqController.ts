import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Fnq } from "../models/Fnq";

export const getFnq = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const fnqs = await Fnq.find();
        res.json(fnqs);
    } catch (error) {
        next(error);
    }
};

export const insertFnq = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.body) {
            res.status(400).json({ success: false, message: "please provide question and answer" });
            return;
        }
        const fnq = new Fnq(req.body);
        await fnq.save();
        res.status(201).json(fnq);
    } catch (error) {
        next(error);
    }
};