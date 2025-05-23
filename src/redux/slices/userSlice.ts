import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isGuest: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  username?: string;
}

const initialState: AuthState = {
  isGuest: localStorage.getItem("authToken") === "guest",
  isAuthenticated: false,
  userId: null,
  username: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGuestMode(state, action: PayloadAction<boolean>) {
      state.isGuest = action.payload;
      state.isAuthenticated = false;
      state.userId = null;
      state.username = undefined;
    },
    setUser(
      state,
      action: PayloadAction<{ userId: string; username?: string }>
    ) {
      state.isGuest = false;
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    clearUser(state) {
      state.isGuest = true;
      state.isAuthenticated = false;
      state.userId = null;
      state.username = undefined;
    },
  },
});

export const { setGuestMode, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
