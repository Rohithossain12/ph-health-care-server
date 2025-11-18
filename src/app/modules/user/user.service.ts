import config from "../../../config";
import { prisma } from "../../shared/prisma";
import { CreatePatientInput } from "./user.interface";
import bcrypt from "bcryptjs";

const createPatient = async (payload: CreatePatientInput) => {
    const saltRounds = Number(config.bcrypt_salt_rounds);
    const hashPassword = await bcrypt.hash(payload.password, saltRounds);

    const result = await prisma.$transaction(async (tx) => {
        await tx.user.create({
            data: {
                email: payload.email,
                password: hashPassword,
            },
        });

        return await tx.patient.create({
            data: {
                name: payload.name,
                email: payload.email,
            },
        });


    });

    return result;
};

export const UserService = {
    createPatient,
};
