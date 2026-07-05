import express from "express";
import Limiter from "../helper/rateLimiter.js";
import { handleLogin, handleLogout } from "../controllers/authController.js";





const router = express.Router();

router.post("/user-login", Limiter, handleLogin);

router.post("/user-logout", Limiter, handleLogout);



export default router;