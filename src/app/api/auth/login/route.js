import prisma from "@/libs/PrismaClientProvider";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
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
    // compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          message: "Invalid password",
          success: false,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    };
    // generate jwt token
    const token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // return the user
    return new Response(
      JSON.stringify({
        accessToken: token,
        success: true,
        message: "User logged in successfully",
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
};