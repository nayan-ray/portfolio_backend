import rateLimit from "express-rate-limit";

const Limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 attempts allowed
  message: {
    success: false,
    message: "Too many  attempts. Try again after 10 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default Limiter;