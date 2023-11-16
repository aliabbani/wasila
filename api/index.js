import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import authListing from './routes/listing.route.js';
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(9000, () => {
  console.log("Server is running on port 9000!");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('api/listing', authListing)