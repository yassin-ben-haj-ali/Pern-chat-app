import express from "express";
import authRouter from "./auth.js";
import messageRouter from "./message.js";


const rootRouter = express.Router();


rootRouter.use("/auth", authRouter);
rootRouter.use("/message", messageRouter);


export default rootRouter