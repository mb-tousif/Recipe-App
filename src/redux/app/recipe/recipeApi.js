import { api } from "@/redux/api";

const recipeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllRecipes: build.query({
      query: (arg) => {
        return {
          url: "/recipes",
          method: "GET",
          params: arg,
        };
      },
      providesTags: ["Recipes"],
    }),
    getRecipeById: build.query({
      query: (id) => {
        return {
          url: `/recipes/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Recipes"],
    }),
    createRecipe: build.mutation({
      query: (data) => {
        return {
          url: `/recipes`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Recipes"],
    }),
    updateRecipe: build.mutation({
      query: (data) => {
        return {
          url: `/recipes/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Recipes"],
    }),
    deleteRecipe: build.mutation({
      query: (id) => {
        return {
          url: `/recipes/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useGetRecipeByIdQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;
