import prisma from "@/libs/PrismaClientProvider";

export async function POST(req, res) {
  const body = await req.json();
  const { title, instructions, ingredient, image } = body;

  try {
    const isExist = await prisma.recipe.findUnique({
      where: { title },
    });

    if (isExist) {
      return new Response(
        JSON.stringify({
          message: "Recipe already exists",
          success: false,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        instructions,
        ingredient,
        image,
      },
      select: {
        id: true,
        title: true,
        instructions: true,
        image: true,
        ingredient: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Recipe created successfully",
        recipe,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 201,
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

export async function GET(req, res) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const search = searchParams.get("search");
      let recipes;
      if (search) {
        recipes = await prisma.recipe.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                ingredient: {
                  contains: search,
                },
              },
            ],
          },
          select: {
            id: true,
            title: true,
            instructions: true,
            image: true,
            ingredient: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      } else {
        recipes = await prisma.recipe.findMany({
          select: {
            id: true,
            title: true,
            instructions: true,
            image: true,
            ingredient: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Recipes fetched successfully",
          recipes,
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
