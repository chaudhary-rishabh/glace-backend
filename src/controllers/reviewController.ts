import { Request, Response, NextFunction } from "express";
import { Review } from "../models/Review";
import { Product } from "../models/Product";
import { createReviewSchema } from "../validations/reviewValidation";

interface AuthRequest extends Request {
    user?: any;
}

export const addReview = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const parsed = createReviewSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.errors });
        return;
    }

    const review = new Review({
        user: req.user._id,
        product: parsed.data.productId,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
    });
    await review.save();

    await Product.findByIdAndUpdate(parsed.data.productId, { $push: { reviews: review._id } });
    res.status(201).json(review);
};

export const getProductReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const reviews = await Review.find({ product: req.params.productId }).populate("user", "email");
    res.json(reviews);
};