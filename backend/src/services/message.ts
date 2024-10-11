import prisma from "../db/prisma.js"
import { getReceiverSocketId, io } from "../socket/socket.js"
import { IGetMessages, ISendMessage } from "../types/index.js"



const sendMessage = async ({ senderId, receiverId, message }: ISendMessage) => {

    let conversation = await prisma.conversation.findFirst({
        where: {
            participantIds: {
                hasEvery: [senderId, receiverId]
            }
        }
    })

    if (!conversation) {
        conversation = await prisma.conversation.create({
            data: {
                participantIds: {
                    set: [senderId, receiverId]
                }
            }
        })
    }

    const newMessage = await prisma.message.create({
        data: {
            senderId,
            body: message,
            conversationId: conversation.id
        }

    })


    if (newMessage) {
        conversation = await prisma.conversation.update({
            where: {
                id: conversation.id
            },
            data: {
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            }
        })
    }

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }


    return newMessage;
}



const getMessages = async ({ senderId, userToChatId }: IGetMessages) => {

    const conversation = await prisma.conversation.findFirst({
        where: {
            participantIds: {
                hasEvery: [senderId, userToChatId]
            }
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })


    if (!conversation) return [];

    const messages = conversation.messages;

    return messages

}



const getUsers = async (currentUserId: string) => {

    const users = await prisma.user.findMany({
        where: {
            id: {
                not: currentUserId
            },
        },
        select: {
            id: true,
            username: true,
            profilePic: true,
            fullName: true

        }
    })

    return users;

}

const messageServices = { sendMessage, getMessages, getUsers };

export default messageServices;