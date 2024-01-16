import { api } from "@/redux/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: data,
        invalidatesTags: "Users",
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        method: "POST",
        body: data,
        providesTags: ["Users"],
      }),
    }),
  }),
});

export const { useSignUpUserMutation, useLoginUserMutation } = authApi;
