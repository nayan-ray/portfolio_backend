import express from "express";
import { createProduct, getAllProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import upload from "../helper/fileUpload.js";
import Limiter from "../helper/rateLimiter.js";

const router = express.Router();

router.post("/add-product", Limiter, upload.single("image"), createProduct);
router.get("/get-products/all", getAllProducts);
router.put("/update-product/:id", Limiter,  upload.single("image"), updateProduct);
router.delete("/delete-product/website/:id", deleteProduct);

export default router;