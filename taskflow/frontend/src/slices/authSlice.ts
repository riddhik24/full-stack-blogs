import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  resUser: object | string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  resUser: localStorage.getItem("loggedInUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action: PayloadAction<string | object>) => {
      state.resUser = action.payload;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    getUser: () => {
      const data = localStorage.getItem("loggedInUser");
      // Check if data exists, then parse and return it
      return data ? JSON.parse(data) : {};
      // JSON.stringify(localStorage.getItem("loggedInUser"));
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { setToken, logout, setUser, getUser } = authSlice.actions;
export default authSlice.reducer;
