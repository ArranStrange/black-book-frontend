import { getCurrentUser } from "../../services/userServices";
import { setGuestMode } from "../slices/authSlice";
import { clearUser, setUser } from "../slices/userSlice";
import { AppDispatch } from "../store";

export const enterGuestMode = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("authToken");
  dispatch(setGuestMode(true));
};

export const performLogout = () => async (dispatch: AppDispatch) => {
  try {
    await logoutUser();
  } catch (err) {
    console.error("Logout failed", err);
  } finally {
    localStorage.removeItem("authToken");
    dispatch({ type: "user/clearUser" });
    dispatch({ type: "auth/setGuestMode", payload: true });
  }
};

export const syncAuthState = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem("authToken");
  if (!token || token === "guest") {
    dispatch(setGuestMode(true));
    return;
  }
  try {
    const user = await getCurrentUser();
    dispatch(setUser({ userId: user._id, username: user.username }));
  } catch (err) {
    dispatch(setGuestMode(true));
  }
};
function logoutUser() {
  throw new Error("Function not implemented.");
}
