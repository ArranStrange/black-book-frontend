import React, { useRef } from "react";
import { useUser } from "../../../hooks/useUser";
import MessageModal from "../../message/MessageModal";
import "../Login/login.css";

//Typescript defining the props types
interface LoginProps {
  onLoginSuccess: () => void;
  setIsRegisterVisible: (visible: boolean) => void;
}

const Login: React.FC<LoginProps> = ({
  //props
  onLoginSuccess,
  setIsRegisterVisible,
}) => {
  //saves the Refs into a variable
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

  //on submition of the form
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //prevents the page rerendering
    e.preventDefault();

    //save the form input into a variable
    //or provides and empty string
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    //if there nothing is provided then throw and error
    if (!username || !password) {
      console.error("Username and Password are required.");
      return;
    }
    // calls the handle login function from the hook with the event, username and password
    handleLogin(e, username, password);
  };

  return (
    <div className="login">
      {/* log in form */}
      <div className="login-card">
        <h2>Login</h2>
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
      {/* register or continue as guest */}
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
