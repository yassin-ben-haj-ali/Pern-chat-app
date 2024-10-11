import { Request, Response } from "express";
import messageServices from "../services/message.js";



export const sendMessage = async (req: Request, res: Response) => {

    const { id: senderId } = req.user;
    const { userId: receiverId } = req.params;
    const { message } = req.body;

    const newMessage = await messageServices.sendMessage({ senderId, receiverId, message });
    res.json(newMessage)
}


export const getMessages = async (req: Request, res: Response) => {

    const { userId: userToChatId } = req.params;
    const { id: senderId } = req.user

    const messages = await messageServices.getMessages({ senderId, userToChatId });
    res.json(messages);

}

export const getUsers = async (req: Request, res: Response) => {


    const { id: currentUserId } = req.user;

    const users = await messageServices.getUsers(currentUserId);

    res.json(users);

}