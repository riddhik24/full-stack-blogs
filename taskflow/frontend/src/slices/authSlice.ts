import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  resUser: any;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("token"),
  resUser: sessionStorage.getItem("loggedInUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      sessionStorage.setItem("token", action.payload);
    },
    setUser: (state, action: PayloadAction<string | object>) => {
      state.resUser = action.payload;
      sessionStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    getUser: () => {
      const data = sessionStorage.getItem("loggedInUser");
      // Check if data exists, then parse and return it
      return data ? JSON.parse(data) : {};
      // JSON.stringify(sessionStorage.getItem("loggedInUser"));
    },
    logout: (state) => {
      state.token = null;
      state.resUser = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("loggedInUser");
    },
  },
});

export const { setToken, logout, setUser, getUser } = authSlice.actions;
export default authSlice.reducer;
