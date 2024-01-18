"use client";
import { useGetAllIngredientsQuery } from "@/redux/app/ingredient/ingredientApi";
import { useCreateRecipeMutation } from "@/redux/app/recipe/recipeApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateAdminService() {
  const [createRecipe, { isLoading:loading, isError:recipeError }] = useCreateRecipeMutation();
  const { data, isLoading, isError } = useGetAllIngredientsQuery();
  const ingredientList = data?.ingredients;
  const { register, handleSubmit, formState: { errors }, reset} = useForm();
 
  const onSubmit = async (data) => {
     try {
       const imgUrl = data.image[0];
       const formData = new FormData();
       formData.append("image", imgUrl);
       const url = `https://api.imgbb.com/1/upload?key=da2f1e176fea3246b58bbffb26e211a6`;
       data.image = await fetch(url, {
         method: "POST",
         body: formData,
       })
         .then((res) => res.json())
         .then((result) => {
           if (result.success) {
             const photoUrl = result.data.url;
             return photoUrl;
           }
         });
       const formattedIngredients = `${data?.ingredient.join(", ")}`;
        data.ingredient = formattedIngredients;
       const res = await createRecipe(data).unwrap();
        toast.success(res.message);
        reset();
      //  router.push("/");
     } catch (err) {
      toast.error(err.data.message);
    }
  };
  return (
    <div>
      <h1 className="text-center mt-4 text-4xl font-bold text-[#474E68]">
        Add Recipe
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
              <label className="flex flex-col items-center px-4 py-6 bg-gray-700 text-gray-50 rounded-lg shadow border border-blue cursor-pointer hover:bg-blue">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base">Upload Recipe Image</span>
                <input
                  type="file"
                  className="hidden"
                  {...register("image", { required: true })}
                />
              </label>
              {errors.image && (
                <p className="text-rose-600 text-center text-sm">
                  Recipe Image is required.
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
