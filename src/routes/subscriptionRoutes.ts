import express from "express";
import { subscribe } from "../controllers/subscriptionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { buyerMiddleware } from "../middlewares/buyerMiddleware";
import { addCategory, getCategory, getCategoryById } from "../controllers/categoryController";

const router = express.Router();

router.post("/", authMiddleware, buyerMiddleware, subscribe);
router.post("/category/add", authMiddleware, buyerMiddleware, addCategory);
router.get("/category/get", authMiddleware, buyerMiddleware, getCategory);
router.get("/category/:id", authMiddleware, buyerMiddleware, getCategoryById);

export default router;