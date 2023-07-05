import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from "./routes/authRoutes.js";
import cookieParser from 'cookie-parser';
import connectToDatabase from './connection/dataBase.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();



const app = express();
const Port = 3000;
app.use(cors());

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", authRoutes);

app.use(errorHandler);
connectToDatabase();

app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});