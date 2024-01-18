"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetRecipeByIdQuery } from "@/redux/app/recipe/recipeApi";
import Image from "next/image";

export default function ManageRecipe({params}) {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      toast.error("You need to login to access this page.")
      router.push("/login");
    }
  }, [token, router]);
  const { data, isLoading } = useGetRecipeByIdQuery(params.id);
  const recipe = data?.recipe;
  // handle ingredient for ui display
  const ingredientsArray = recipe?.ingredient.split(", ");
  if (isLoading) return <div className="p-20 text-center font-bold text-2xl">Loading...</div>;
  return (
    <div className="max-w-md mx-auto">
      <h5 className="text-gray-800 text-center mt-8 font-bold text-xl sm:text-2xl tracking-tight mb-2">
        Recipe Details
      </h5>
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 mt-6">
        <Image
          width={500}
          height={500}
          className="rounded-t-lg"
          src={recipe?.image}
          alt={recipe?.title}
        />
        <div className="p-5">
          <h5 className="text-gray-700 font-bold text-lg sm:text-2xl tracking-tight mb-2">
            {recipe?.title}
          </h5>
          <p className="font-normal text-sm sm:text-lg text-gray-700 mb-3">
            {recipe?.instructions}
          </p>
          <ol className="items-center">
            <span className="text-gray-700 font-bold text-lg">Ingredients:-</span>
            {ingredientsArray?.map((ingredient, index) => (
              <li
                key={index}
                className="mr-3 text-center text-gray-700 text-sm sm:text-lg"
              >
                {ingredient}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
