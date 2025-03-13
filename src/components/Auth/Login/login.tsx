import React, { useRef } from "react";
import { useUser } from "../../../hooks/useUser";
import MessageModal from "../../message/MessageModal";
import "../Login/login.css";

//Define props from App.tsx
interface LoginProps {
  onLoginSuccess: () => void;
  setIsRegisterVisible: (visible: boolean) => void;
}

//React functional component
const Login: React.FC<LoginProps> = ({
  //destructuring the props
  onLoginSuccess,
  setIsRegisterVisible,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //long list of calls to the useUser hook
  const {
    modalTitle,
    modalMessage,
    handleLogin,
    handleGuestLogin,
    handleCloseModal,
  } = useUser(onLoginSuccess);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //save the form input into a variable
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!username || !password) {
      console.error("Username and Password are required.");
      return;
    }

    handleLogin(e, username, password);
  };

  //UI elements of the log-in
  return (
    <div className="login">
      <div className="login-card">
        <h2>Login</h2>
        {/* React Form using onSubmit to handle Login */}
        <form className="login-form" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={usernameRef} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordRef} required />
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
        <button
          onClick={() => {
            console.log("Register button clicked");
            setIsRegisterVisible(true);
          }}
        >
          Register
        </button>
        <button onClick={handleGuestLogin}>Continue as Guest</button>
      </div>
    </div>
  );
};

export default Login;
