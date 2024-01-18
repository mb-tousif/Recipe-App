"use client";
import { useGetAllIngredientsQuery } from '@/redux/app/ingredient/ingredientApi';
import { useGetRecipeByIdQuery, useUpdateRecipeMutation } from '@/redux/app/recipe/recipeApi';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function EditRecipe({params}) {
  const { data, isLoading, isError } = useGetRecipeByIdQuery(params.id);
  const { data: ingredientsData } = useGetAllIngredientsQuery({});
  const [ updateRecipe, { isLoading: isUpdating } ] = useUpdateRecipeMutation();
  const ingredientList = ingredientsData?.ingredients;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
  try {
    const formattedIngredients = Array.isArray(data?.ingredient)
      ? data.ingredient.join(", ")
      : data?.ingredient;
    data.ingredient = formattedIngredients;
    data.id = params.id;
    await updateRecipe(data).unwrap();
    toast.success("Recipe updated successfully.");
    router.push(`/recipes/${params.id}`);
  } catch (error) {
    toast.error(error?.data?.message);
  }

  }
  return (
    <div>
      <h1 className="text-center mt-4 text-4xl font-bold text-[#474E68]">
        Edit Recipe
      </h1>
      <div className="flex justify-center sm:p-6 md:p-10">
        <div className="min-h-50vh md:ml-32 w-full md:w-[600px] rounded-2xl bg-slate-500">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 pt-6 pb-8 mb-4 rounded"
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-50"
                htmlFor="title"
              >
                Recipe Title
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight bg-gray-700 text-gray-50 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                {...register("title", { required: true })}
                type="text"
                name="title"
                placeholder="Enter Recipe Title"
              />
              {errors.title && (
                <p className="text-rose-600 text-center">
                  Recipe Title is required.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-50"
                htmlFor="image"
              >
                Recipe Image URL
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight bg-gray-700 text-gray-50 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                {...register("image", { required: true })}
                type="text"
                name="image"
                placeholder="Enter Recipe Image URL"
              />
              {errors.image && (
                <p className="text-rose-600 text-center">
                  Recipe Image URL is required.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="ingredient"
                className="inline-block mb-2 mr-2 text-gray-50"
              >
                Recipe ingredients
              </label>
              <select
                className={`w-full text-center bg-gray-700 text-gray-50 rounded-lg text-xl ${
                  errors.ingredient &&
                  " focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                {...register("ingredient", { required: true })}
                multiple
                disabled={isLoading || isError}
              >
                <option value="select">--Select Ingredients--</option>
                {ingredientList?.map((ingredient) => (
                  <option
                    className=" hover:bg-[#583E26] selection:bg-[#583E26]"
                    key={ingredient.id}
                    value={ingredient.label}
                  >
                    {ingredient.label}
                  </option>
                ))}
              </select>
              {errors.ingredient && (
                <p className="text-rose-600 text-center">
                  Recipe ingredients is required.
                </p>
              )}
              <p className="text-sm text-gray-50 text-justify p-2">
                Please hold Ctrl (Windows) or Command (Mac) to select multiple
                options.
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-50"
                htmlFor="instructions"
              >
                Recipe Instruction
              </label>
              <textarea
                className="w-full px-3 py-2 mb-3 text-sm leading-tight bg-gray-700 text-gray-50 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                rows={6}
                name="instructions"
                {...register("instructions", { required: true })}
                placeholder="Enter Recipe Instruction"
              />
              {errors.instructions && (
                <p className="text-rose-600 text-center">
                  Recipe Instruction is required.
                </p>
              )}
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full bg-[#583E26] text-white px-4 py-2 rounded-lg hover:bg-[#57394a] outline-none"
                type="submit"
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
