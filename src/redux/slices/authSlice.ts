import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isGuest: boolean;
}

const initialState: AuthState = {
  isGuest: localStorage.getItem("authToken") === "guest",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGuestMode(state, action: PayloadAction<boolean>) {
      state.isGuest = action.payload;
    },
  },
});

export const { setGuestMode } = authSlice.actions;
export default authSlice.reducer;
