import express, { json, urlencoded } from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from 'cors'

import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";

import auth from "./middleware/auth.js";

const app = express();
dotenv.config()

app.use(cors({
  origin: process.env.FRONT_END_SERVER.split(','),
  credentials: true
}))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(auth);

app.use("/", indexRouter);
app.use("/users", userRouter);


export default app;
