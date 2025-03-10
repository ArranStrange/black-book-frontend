import React, { useState } from "react";
import { API_URL } from "../../utils/config";
import MessageModal from "../message/MessageModal";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setModalTitle("Registration successful!");
      onRegisterSuccess();
      setUsername("");
      setPassword("");
    } catch (err: any) {
      setModalMessage(err.message);
    }
  };

  const handleCloseModal = () => {
    setModalTitle(null);
    setModalMessage(null);
  };

  return (
    <div className="register">
      <div className="register-card">
        <h3>Register</h3>
        <form className="register-form" onSubmit={handleRegister}>
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
