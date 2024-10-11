import http from "http";
import express from "express";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId: string) => {
    return userSocketMap[receiverId]
}

const userSocketMap: { [key: string]: string } = {}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string
    if (userId) userSocketMap[userId] = socket.id
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        delete userSocketMap[socket.id]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

});

export { app, io, server }