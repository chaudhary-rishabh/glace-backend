import express from "express";
import { getDashboard, getAllOrders } from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { addCategory, getCategory, getCategoryById } from "../controllers/categoryController";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboard);
router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);
router.post("/category/add", authMiddleware, adminMiddleware, addCategory);
router.get("/category/get", authMiddleware, adminMiddleware, getCategory);
router.get("/category/:id", authMiddleware, adminMiddleware, getCategoryById);

export default router;  