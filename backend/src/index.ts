import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import logger from './utils/logger.js';
import rootRouter from './routes/index.js';
import { app, server } from './socket/socket.js';

dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.use("/api", rootRouter);
//error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    if (err.isOperational) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
})
