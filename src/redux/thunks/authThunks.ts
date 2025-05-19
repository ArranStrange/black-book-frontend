import { setGuestMode } from "../slices/authSlice";
import { AppDispatch } from "../store";

export const enterGuestMode = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("authToken");
  dispatch(setGuestMode(true));
};

export const syncAuthState = () => (dispatch: AppDispatch) => {
  const token = localStorage.getItem("authToken");
  const isGuest = token === "guest" || !token;
  dispatch(setGuestMode(isGuest));
};
