import { NextFunction, Request, Response } from "express";

const catchMiddleware = (fn:Function) => (req:Request, res:Response, next:NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((e) => {
        next(e);
    });
};

export default catchMiddleware
