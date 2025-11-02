import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './config/db.js';
import authroutes from '../otpgenerator-node/routes/authRoutes.js'

dotenv.config();
connectdb();

const app =  express();
app.use(express.json());
app.use(cors());

app.use("/api/auth",authroutes);
app.listen(3000,()=>{
    console.log("server is running on 3000")
})

