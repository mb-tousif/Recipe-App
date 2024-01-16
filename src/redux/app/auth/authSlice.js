import { createSlice } from "@reduxjs/toolkit";

const getToken = ()=> {
    let token = null;
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return token;
}

const initialState = {
    token : getToken() || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', state.token);
        },
        removeToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;