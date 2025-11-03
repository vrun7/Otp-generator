import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './config/db.js';
import authroutes from '../otpgenerator-node/routes/authRoutes.js';
import path from "path";
import { fileURLToPath } from "url";

// ✅ Load .env
dotenv.config();

// ✅ Connect MongoDB
connectdb();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors());

// ✅ Your API routes
app.use("/api/auth", authroutes);

// ✅ Required for ES modules file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve React build (combined deployment)
app.use(express.static(path.join(__dirname, "../frontend/build")));

// ✅ Catch-all route for React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
