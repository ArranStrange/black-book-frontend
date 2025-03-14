import { useState } from "react";
import { registerUser } from "../services/userServices";

export const useRegister = () => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleRegister = async (
    e: React.FormEvent,
    username: string,
    password: string,
    onRegisterSuccess: () => void
  ) => {
    try {
      // takes the params passed from register component and passes them to registerUser in userServices
      await registerUser(username, password);
      //updates the messagemodal with success message
      setModalTitle("Registration successful!");
      setModalMessage("You can now log in.");
      //set time out to close the message after 2 seconds and direct you to the main page
      setTimeout(() => {
        onRegisterSuccess();
      }, 2000);
      //catches any errors and displays the error in the message modal
    } catch (error: any) {
      setModalTitle("Registration failed");
      setModalMessage(error.message);
    }
  };

  //handles close message modal by resetting message state
  const handleCloseModal = () => {
    setModalTitle(null);
    setModalMessage(null);
  };

  return {
    modalTitle,
    modalMessage,
    handleRegister,
    handleCloseModal,
  };
};
