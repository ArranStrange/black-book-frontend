// userServices.ts
import axios from "axios";
import { API_URL } from "../utils/config";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Invalid username or password. Please try again.");
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/users`, {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error);
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong during registration."
    );
  }
};
