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
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
    //catched any errors
  } catch (error) {
    //if the API fails it logs and throws the below error messages
    console.error("Login error:", error);
    throw new Error("Invalid username or password. Please try again.");
  }
};
//
//
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
