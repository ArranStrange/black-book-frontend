import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/config";
import axios from "axios";
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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Automatically log the user in if a token exists
      onLoginSuccess();
    }
  }, [onLoginSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attempting to login with:", { username, password });
    try {
      // Sending username and password to backend
      const response = await axios.get(`${API_URL}/auth/users`, {
        params: {
          username,
          password,
        },
      });
      console.log("Login response:", response.data);

      // Check if the backend responded with a success message
      if (response.data.message === "Login successful") {
        // Login is successful, store token in localStorage
        localStorage.setItem("authToken", response.data.token || "loggedIn");

        // Trigger login success callback
        onLoginSuccess();
      } else {
        setModalTitle("Login Failed");
        setModalMessage("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setModalTitle("Login Error");
      setModalMessage("Invalid username or password. Please try again.");
    }
  };

  // Handle guest login
  const handleGuestLogin = () => {
    // Set a guest login flag in localStorage
    localStorage.setItem("authToken", "guest");

    // Trigger login success callback
    onLoginSuccess();
  };

  const handleCloseModal = () => {
    setModalTitle(null);
    setModalMessage(null);
  };

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
        <div className="register-guest-box">
          <button onClick={() => setIsRegisterVisible(true)}>Register</button>

          <button onClick={handleGuestLogin}>Continue as Guest</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
