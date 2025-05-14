import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Product } from "../models/Product";
import { createProductSchema } from "../validations/productValidation";

export const addProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const parsed = createProductSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.errors });
            return;
        }

        const product = new Product(parsed.data);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const products = await Product.find()
            .skip((+page - 1) * +limit)
            .limit(+limit)
            .populate("reviews");
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id).populate("reviews");
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const getProductsByCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { category } = req.query;

        if (!category) {
            res.status(400).json({ message: "Category parameter is required" });
            return;
        }

        const products = await Product.find({ category: category })
            .limit(3)
            .populate("reviews");

        if (products.length === 0) {
            res.status(404).json({ message: "No products found for this category" });
            return;
        }

        res.json(products);
    } catch (error) {
        next(error);
    }
};