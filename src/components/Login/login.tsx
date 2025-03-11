import React from "react";
import { useUser } from "../../hooks/useUser";
import MessageModal from "../message/MessageModal";
import "../Login/login.css";

interface LoginProps {
  onLoginSuccess: () => void;
  setIsRegisterVisible: (visible: boolean) => void;
}

const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  setIsRegisterVisible,
}) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    modalTitle,
    modalMessage,
    handleLogin,
    handleGuestLogin,
    handleCloseModal,
  } = useUser(onLoginSuccess);

  return (
    <div className="login">
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {modalTitle && modalMessage && (
            <MessageModal
              title={modalTitle}
              message={modalMessage}
              onClose={handleCloseModal}
            />
          )}
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="register-guest-box">
        <button onClick={() => setIsRegisterVisible(true)}>Register</button>
        <button onClick={handleGuestLogin}>Continue as Guest</button>
      </div>
    </div>
  );
};

export default Login;
