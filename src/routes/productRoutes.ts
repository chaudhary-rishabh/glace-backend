import express from "express";
import { addProduct, getProducts, getProductById, getProductsByCategory } from "../controllers/productController";
import { authMiddleware, adminOnly } from "../middlewares/authMiddleware";
import { buyerMiddleware } from "../middlewares/buyerMiddleware";

const router = express.Router();

router.post("/addProducts", authMiddleware, buyerMiddleware, addProduct);
router.get("/getAllProducts", getProducts);
router.get("/productsByCategory", getProductsByCategory);
router.get("/:id", getProductById);

export default router;