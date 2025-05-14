import express from "express";
import { addReview, getProductReviews } from "../controllers/reviewController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { buyerMiddleware } from "../middlewares/buyerMiddleware";
import { verifiedBuyerMiddleware } from "../middlewares/verifiedBuyerMiddleware";

const router = express.Router();

router.post("/", authMiddleware, buyerMiddleware, verifiedBuyerMiddleware, addReview);
router.get("/:productId", getProductReviews);

export default router;