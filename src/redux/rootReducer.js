import { api } from "./api";
import authSlice from "./app/auth/authSlice";

export const reducer = {
  auth: authSlice,
  [api.reducerPath]: api.reducer,
};
