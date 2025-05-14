import express from "express";
import { placeOrder, getOrders, updateOrderStatus } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { buyerMiddleware } from "../middlewares/buyerMiddleware";

const router = express.Router();

router.post("/", authMiddleware, buyerMiddleware, placeOrder);
router.get("/", authMiddleware, getOrders);
router.put("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;