import express from "express";
import { sendOtp, verifyOtp, protectedData } from "../controllers/authControllers.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//  rate limiter (limit OTP requests)
import rateLimit from "express-rate-limit";

const otpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: "Too many OTP requests, please try again later",
});

router.post("/send-otp", otpLimiter, sendOtp);
router.post("/verify-otp", verifyOtp);

// JWT Middleware
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/protected", auth, protectedData);

export default router;
