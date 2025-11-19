import z from "zod"



const createPatientValidationSchema = z.object({
    password: z.string(),
    name: z.string({
        error: "Name is required"
    }),
    email: z
        .string({ message: "Email is required" })
        .min(1, { message: "Email is required" })
        .email("Please enter a valid email address"),
    address: z.string().optional(),
    contactNumber: z.string().optional()

})



export const UserValidation = {
    createPatientValidationSchema
}