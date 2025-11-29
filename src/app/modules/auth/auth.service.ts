import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import config from "../../../config";
import { jwtHelpers } from "../../helper/jwtHelper";


const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new Error("password is incorrect")
    }


    const accessToken = jwtHelpers.generateToken({ email: user.email, role: user.role }, config.jwt_secret as string, "1h");
    const refreshToken = jwtHelpers.generateToken({ email: user.email, role: user.role }, config.jwt_secret as string, "30d");


    return {
        accessToken,
        refreshToken,
        needPasswordChange:user.needPasswordChange
    }
}




export const AuthService = {
    login
};