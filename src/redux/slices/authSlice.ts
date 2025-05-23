import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isGuest: boolean;
  userId: string | null;
  username?: string;
}

const initialState: AuthState = {
  isGuest: localStorage.getItem("authToken") === "guest",
  userId: null,
  username: undefined,
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
