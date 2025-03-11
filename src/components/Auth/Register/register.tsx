import React from "react";
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
  const {
    username,
    setUsername,
    password,
    setPassword,
    modalTitle,
    modalMessage,
    handleRegister,
    handleCloseModal,
  } = useRegister();

  return (
    <div className="register">
      <div className="register-card">
        <h3>Register</h3>
        <form
          className="register-form"
          onSubmit={(e) => handleRegister(e, () => setIsLoginVisible(true))}
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
