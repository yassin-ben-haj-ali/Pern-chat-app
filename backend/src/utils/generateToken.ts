import jwt from "jsonwebtoken"

export const generateToken = (payload: any) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "8h"
    })
    return token;

}