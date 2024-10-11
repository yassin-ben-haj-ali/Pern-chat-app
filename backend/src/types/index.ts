export type ISendMessage = {
    senderId: string
    receiverId: string
    message: string
}

export type IGetMessages = {
    senderId: string
    userToChatId: string
}

export type ISignup = {
    username: string,
    fullName: string,
    password: string,
    confirmPassword: string,
    gender: 'male' | 'female'
}

export type ILogin = {
    username: string,
    password: string
}