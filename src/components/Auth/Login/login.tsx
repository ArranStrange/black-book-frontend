import React, { useRef } from "react";
import { useUser } from "../../../hooks/useUser";
import MessageModal from "../../message/MessageModal";
import { useAppDispatch } from "../../../redux/hooks";
import { setView } from "../../../redux/slices/uiSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

interface LoginProps {
  onLoginSuccess: () => void;
  setIsRegisterVisible: (visible: boolean) => void;
}

const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  setIsRegisterVisible,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const {
    modalTitle,
    modalMessage,
    handleLogin,
    handleGuestLogin,
    handleCloseModal,
  } = useUser(onLoginSuccess);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    if (!username || !password) {
      console.error("Username and Password are required.");
      return;
    }
    handleLogin(e, username, password);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      px={2}
      data-testid="login-form"
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" mb={2}>
            Login
          </Typography>

          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                inputRef={usernameRef}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="Password"
                inputRef={passwordRef}
                variant="outlined"
                type="password"
                fullWidth
                required
              />

              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Stack>
          </form>

          {modalTitle && modalMessage && (
            <MessageModal
              title={modalTitle}
              message={modalMessage}
              onClose={handleCloseModal}
            />
          )}
        </CardContent>
      </Card>

      <Stack
        direction="row"
        spacing={2}
        mt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="text" onClick={() => dispatch(setView("register"))}>
          Register
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            handleGuestLogin();
            dispatch(setView("app"));
          }}
        >
          Continue as Guest
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
