import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Category } from "../models/Category";
import { createCategorySchema } from "../validations/categoryValidation";

export const addCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const parsed = createCategorySchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.errors });
            return;
        }

        const category = new Category(parsed.data);
        await category.save();
        res.status(201).json({ success: true, message: "Category created successfully", category });
    } catch (error) {
        next(error);
    }
};

export const getCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const Categorys = await Category.find()
        res.json(Categorys);
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const category = await Category.findById(req.params.id).populate("products");
        if (!category) {
            res.status(404).json({ message: "category not found" });
            return;
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
};