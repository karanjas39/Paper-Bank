import { userType } from "@/lib/ApiTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userType = {
  name: "",
  email: "",
  admin: false,
  createdAt: "",
  program: { name: "" },
  updatedAt: "",
  verified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      if (!action.payload) {
        state = initialState;
      }
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.verified = action.payload.verified;
      state.admin = action.payload.admin;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.program.name = action.payload.program.name;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
