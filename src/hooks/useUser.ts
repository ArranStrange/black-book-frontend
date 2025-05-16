import { useState, useEffect } from "react";
import { loginUser } from "../services/userServices";

export const useUser = (onLoginSuccess: () => void) => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token === "loggedIn") {
      onLoginSuccess();
    }
  }, [onLoginSuccess]);

  const handleLogin = async (
    e: React.FormEvent,
    username: string,
    password: string
  ) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);

      if (data.message === "Login successful") {
        localStorage.setItem("authToken", "loggedIn");
        onLoginSuccess();
      } else if (data.message === "Invalid username or password") {
        setModalTitle("Login Failed");
        setModalMessage("Invalid username or password");
      }
    } catch (error: any) {
      setModalTitle("Login Error");
      setModalMessage(error.message || "Something went wrong.");
    }
  };

  const handleGuestLogin = () => {
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
