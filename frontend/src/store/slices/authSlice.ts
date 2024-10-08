import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  token: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      }
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    initializeAuth: (state) => {
      state.token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      state.isInitialized = true;
    },
  },
});

export const { setToken, clearToken, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
