import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import userReducer from "../redux/slices/userSlice";
import drinksReducer from "../redux/slices/drinksSlice";
import uiReducer from "../redux/slices/uiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    drinks: drinksReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
