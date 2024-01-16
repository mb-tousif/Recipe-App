import prisma from "@/libs/PrismaClientProvider";
import bcrypt from "bcrypt";

export async function POST(req, res) {
    try {
        const body = await req.json();
        const { email, password, name } = body;
        const isUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (isUser) {
            return new Response(
              JSON.stringify({
                message: "User not found",
                success: false,
              }),
              {
                headers: { "Content-Type": "application/json" },
                status: 400,
              }
            );
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create the user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        // return the user
        return new Response(
          JSON.stringify({
            user: newUser,
            success: true,
            message: "User created successfully",
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 200,
          }
        );
    } catch (error) {
        return new Response(
          JSON.stringify({
            message: error.message,
            success: false,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 500,
          }
        );
    }
}