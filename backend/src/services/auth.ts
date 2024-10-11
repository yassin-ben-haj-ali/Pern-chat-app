import prisma from "../db/prisma.js";
import { AlreadyExistError, BadRequestError, NotFoundError } from "../utils/appErrors.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { ILogin, ISignup } from "../types/index.js";


const signup = async ({ username, fullName, password, confirmPassword, gender }: ISignup) => {

    if (password !== confirmPassword) throw new BadRequestError("Passwords don't match");

    const user = await prisma.user.findUnique({ where: { username }, select: { id: true, username: true, fullName: true, profilePic: true } })

    if (user) throw new AlreadyExistError("Username already exists")

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //Unique avatar
    //https://avatar.iran.liara.run/public/boy?username=Scott
    //https://avatar.iran.liara.run/public/girl?username=Maria

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
        data: {
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        }
    })

    const token = generateToken({ userId: newUser.id });

    return {
        ...newUser,
        password: "",
        token
    }

}



const login = async ({ username, password }: ILogin) => {

    const user = await prisma.user.findUnique({ where: { username }, select: { id: true, username: true, fullName: true, profilePic: true, password: true } })
    if (!user) {
        throw new BadRequestError("Invalid username or Password")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

    if (!isPasswordCorrect) {
        throw new BadRequestError("Invalid username or Password")
    }
    const token = generateToken({ userId: user.id });
    return {
        ...user,
        password: "",
        token
    }

}

const getMe = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, username: true, fullName: true, profilePic: true, gender: true } });
    if (!user) {
        throw new NotFoundError("User not found")
    }
    return user;
}

const authServices = { signup, login, getMe };

export default authServices;