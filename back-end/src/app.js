import express, { json, urlencoded } from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";

const app = express();
dotenv.config()

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", userRouter);

export default app;
