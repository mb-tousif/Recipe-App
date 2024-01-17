import prisma from "@/libs/PrismaClientProvider";

// Get recipe by id
export async function GET(req, { params }) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id },
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
        message: "Recipe retrieved successfully",
        recipe,
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

// update recipe
export async function PATCH(req, { params }) {
  const updateData = await req.json();

  try {
    const recipe = await prisma.recipe.update({
      where: { id: params.id },
      data: updateData,
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
        message: "Recipe updated successfully",
        recipe,
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

// delete recipe
export async function DELETE(req, { params }) {
  try {
    const isExist = await prisma.recipe.findUnique({
        where: { id: params.id },
        });
    if (!isExist) {
      return new Response(
        JSON.stringify({
          message: "Recipe does not exist",
          success: false,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    const recipe = await prisma.recipe.delete({
      where: { id: params.id },
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
        message: "Recipe deleted successfully",
        recipe,
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
