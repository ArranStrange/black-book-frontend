import { useState } from "react";
import { registerUser } from "../services/userServices";

export const useRegister = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleRegister = async (
    e: React.FormEvent,
    onRegisterSuccess: () => void
  ) => {
    e.preventDefault();
    try {
      await registerUser(username, password);
      setModalTitle("Registration successful!");
      setModalMessage("You can now log in.");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        onRegisterSuccess();
      }, 2000);
    } catch (error: any) {
      setModalTitle("Registration failed");
      setModalMessage(error.message);
    }
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
    handleRegister,
    handleCloseModal,
  };
};
