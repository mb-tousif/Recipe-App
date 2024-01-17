import getToken from "@/utils/getToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Users", "Recipes", "Ingredients"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const accessToken = getToken(state);
      if (accessToken) {
        headers.set("Authorization", `${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
