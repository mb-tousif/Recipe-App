import { api } from "@/redux/api";

const ingredientApi = api.injectEndpoints({
    getAllIngredients: build.query({
        query: (arg) => {
        return {
            url: "/ingredients",
            method: "GET",
            params: arg,
        };
        },
        transformResponse: (response) => {
        return {
            ingredients: response.data,
        };
        },
        providesTags: ["Ingredients"],
    }),
});

export const { useGetAllIngredientsQuery } = ingredientApi;