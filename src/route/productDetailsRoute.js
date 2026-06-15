import express from "express";


import Limiter from "../helper/rateLimiter.js";
import { createProductDetails,getProductDetailsByProductId, updateProductDetails, deleteProductDetails } from "../controllers/productDetailController.js";

const router = express.Router();

router.post("/add-product-details", Limiter, createProductDetails);
router.get("/get-details/product/:id", getProductDetailsByProductId);
router.put("/update/product/details/:id", updateProductDetails);
router.delete("/delete/product/details/:id", deleteProductDetails);


export default router;