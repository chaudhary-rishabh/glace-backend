import express from "express";
import { checkout, verifyPayment } from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { buyerMiddleware } from "../middlewares/buyerMiddleware";

const router = express.Router();

router.post("/checkout", authMiddleware, buyerMiddleware, checkout);
router.post("/verify", authMiddleware, buyerMiddleware, verifyPayment);

export default router;