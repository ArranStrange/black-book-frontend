import React, { useRef } from "react";
import { useRegister } from "../../../hooks/useRegister";
import MessageModal from "../../message/MessageModal";
import "./register.css";

interface RegisterProps {
  onRegisterSuccess: () => void;
  setIsLoginVisible: (visible: boolean) => void;
  onGuestLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({
  onRegisterSuccess,
  setIsLoginVisible,
  onGuestLogin,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {
    username,
    password,
    modalTitle,
    modalMessage,
    handleRegister,
    handleCloseModal,
  } = useRegister();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //save the form input into a variable
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!username || !password) {
      console.error("Username and Password are required.");
      return;
    }

    handleRegister(e, username, password, onRegisterSuccess);
  };

  return (
    <div className="register">
      <div className="register-card">
        <h3>Register</h3>
        <form className="register-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" ref={usernameRef} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" ref={passwordRef} required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="login-switch-box">
        <button onClick={() => setIsLoginVisible(true)}>Login</button>
        <button onClick={onGuestLogin}>Continue as Guest</button>
      </div>
      {modalTitle && modalMessage && (
        <MessageModal
          title={modalTitle}
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Register;
