"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useDeleteRecipeMutation,
  useGetAllRecipesQuery,
} from "@/redux/app/recipe/recipeApi";
import Image from "next/image";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function ManageRecipes() {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      toast.error("You need to login to access this page.");
      router.push("/login");
    }
  }, [token, router]);
  const { data, isLoading } = useGetAllRecipesQuery({});
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
  if (isLoading || isDeleting)
    return (
      <div className="p-20 text-center font-bold text-2xl">Loading...</div>
    );
  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id).unwrap();
      toast.success("Recipe deleted successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-4 text-4xl font-bold text-[#474E68]">
        Manage Recipes
      </h1>
      <div className="sm:p-8 mt-3 md:ml-14">
          <div className="inline-block min-w-full sm:px-20 shadow rounded-lg overflow-hidden">
            <table className="min-w-full rounded-xl bg-[#3c4153ad] max-w-sm">
              <thead>
                <tr className="">
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-50 uppercase tracking-wider">
                    Recipe Details
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-50 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.recipes.map((recipe) => (
                  <tr key={recipe?.id}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-20 h-20">
                          <Image
                            className="w-full h-full rounded-full"
                            width={50}
                            height={50}
                            src={recipe?.image}
                            alt={recipe?.title}
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-50 text-xl whitespace-no-wrap">
                            {recipe?.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="text-gray-50 flex justify-evenly whitespace-no-wrap">
                        <button>
                          <AiFillDelete
                            onClick={() => handleDelete(recipe.id)}
                            className="text-gray-50 h-6 w-6"
                          />
                        </button>
                        <Link href={`/manage-recipes/edit/${recipe.id}`}>
                          <AiFillEdit className="text-gray-50 ml-3 h-6 w-6" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}
