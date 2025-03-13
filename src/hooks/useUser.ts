import { useState, useEffect } from "react";
import { loginUser } from "../services/userServices";

export const useUser = (onLoginSuccess: () => void) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      onLoginSuccess();
    }
  }, [onLoginSuccess]);

  const handleLogin = async (
    e: React.FormEvent,
    username: string,
    password: string
  ) => {
    e.preventDefault();
    // console.log("Attempting to login with:", { username, password });

    try {
      const data = await loginUser(username, password);
      console.log("Login response:", data);

      if (data.message === "Login successful") {
        localStorage.setItem("authToken", "loggedIn");
        onLoginSuccess();
      } else {
        setModalTitle("Login Failed");
        setModalMessage("Invalid username or password");
      }
    } catch (error: any) {
      setModalTitle("Login Error");
      setModalMessage(error.message);
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
    username,
    setUsername,
    password,
    setPassword,
    modalTitle,
    modalMessage,
    handleLogin,
    handleGuestLogin,
    handleCloseModal,
  };
};
