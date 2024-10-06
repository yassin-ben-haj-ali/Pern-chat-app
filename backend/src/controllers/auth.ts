import { Request, Response } from "express";
import authServices from "../services/auth.js";

export const signup = async (req: Request, res: Response) => {

    const { username, fullName, password, confirmPassword, gender } = req.body;
    const user = await authServices.signup({ username, fullName, password, confirmPassword, gender });
    const { token, ...data } = user;
    res.cookie("jwt", token, {
        maxAge: 8 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
    res.json({ token, data })

}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await authServices.login({ username, password });
    const { token, ...data } = user;
    res.cookie("jwt", token, {
        maxAge: 8 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
    res.json({ token, data })
}

export const logout = (req: Request, res: Response) => {
    res.cookie("jwt", "", { maxAge: 0 }).json({ data: "Logged out successfully" })
}

export const getMe = async (req: Request, res: Response) => {
    const user = await authServices.getMe(req.user.id);
    res.json(user);
}
