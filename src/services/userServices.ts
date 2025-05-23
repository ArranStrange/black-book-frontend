import axios from "axios";
import { API_URL } from "../utils/config";
//
//
//
// LOGIN
//
//
// async request with axios, using the parameters set in the login form
export const loginUser = async (username: string, password: string) => {
  try {
    //send the usename and the password to the below URL
    // the data is then handled by the backend
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
    //catched any errors
  } catch (error) {
    //if the API fails it logs and throws the below error messages
    console.error("Login error:", error);
    throw new Error("Invalid username or password. Please try again.");
  }
};
//
//LOGOUT
//
export const logoutUser = async () => {
  return axios.post(`${API_URL}/auth/logout`, null, {
    withCredentials: true,
  });
};
//
// REGISTER
//
//
// takes the username and password passed from the register form
export const registerUser = async (username: string, password: string) => {
  try {
    //uses POST to pass this to the URL below
    const response = await axios.post(`${API_URL}/auth/users`, {
      //sends the username and password to the URL
      username,
      password,
    });
    //expects a response
    return response.data;
    //catches any errors
  } catch (error: any) {
    //logs and throws the error
    console.error("Registration error:", error);
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong during registration."
    );
  }
};
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
};
