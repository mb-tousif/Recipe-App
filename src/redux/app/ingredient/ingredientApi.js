import { api } from "@/redux/api";

const ingredientApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllIngredients: build.query({
      query: () => ({
        url: `/ingredients`,
        method: "GET",
      }),
      providesTags: ["Ingredients"],
    }),
  }),
});

export const { useGetAllIngredientsQuery } = ingredientApi;
