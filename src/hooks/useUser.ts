import { useState, useEffect } from "react";
import { loginUser } from "../services/userServices";

export const useUser = (onLoginSuccess: () => void) => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  //
  //
  //
  //
  // Use Effect to check if there is a authToken in localStorage when component mounts.
  // if found executes onLoginSuccess and directs to the main page
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      onLoginSuccess();
    }
  }, [onLoginSuccess]);
  //
  //
  //
  // handles login form submition
  // asynchronous call to the api with the username and password from the form
  const handleLogin = async (
    //parameters sent from
    e: React.FormEvent,
    username: string,
    password: string
  ) => {
    // console.log("Attempting to login with:", { username, password });

    try {
      // cassl loginUser from the API and saves the response in a variable
      const data = await loginUser(username, password);
      // console.log("Login response:", data);
      //
      // if the response data is === to Login successful then store an authToken in local storage
      if (data.message === "Login successful") {
        localStorage.setItem("authToken", "loggedIn");
        //execute loginSuccessful (closing the login page and taking you to main page)
        onLoginSuccess();
        //else pass error message to modal
      } else if (data.message === "Invalid username or password") {
        setModalTitle("Login Failed");
        setModalMessage("Invalid username or password");
      }
      //displays any errors from the call in the modal
    } catch (error: any) {
      setModalTitle("Login Error");
      setModalMessage(error.message);
    }
  };
  //
  //
  //
  // handles guest log in by storing an authToken in localStorage "guest"
  const handleGuestLogin = () => {
    //setItem
    localStorage.setItem("authToken", "guest");
    onLoginSuccess();
  };

  const handleCloseModal = () => {
    setModalTitle(null);
    setModalMessage(null);
  };

  return {
    modalTitle,
    modalMessage,
    handleLogin,
    handleGuestLogin,
    handleCloseModal,
  };
};
