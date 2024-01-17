import prisma from "@/libs/PrismaClientProvider";

// get all ingredients
export async function GET(req, res) {
    try {
        const ingredients = await prisma.ingredient.findMany({
        select: {
            id: true,
            label: true,
            createdAt: true,
            updatedAt: true,
        },
        });
        return new Response(
        JSON.stringify({
            success: true,
            message: "Ingredients fetched successfully",
            ingredients,
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
            status: 400,
        }
        );
    }
    }
