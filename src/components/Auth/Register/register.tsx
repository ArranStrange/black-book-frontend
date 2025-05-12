import React, { useRef, useState } from "react";
import { useRegister } from "../../../hooks/useRegister";
import MessageModal from "../../message/MessageModal";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

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
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const { modalTitle, modalMessage, handleRegister, handleCloseModal } =
    useRegister();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (!username || !password) {
      console.error("Username and Password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    handleRegister(e, username, password, onRegisterSuccess);
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
      data-testid="register-form"
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" mb={2}>
            Register
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
              <TextField
                label="Confirm Password"
                inputRef={confirmPasswordRef}
                variant="outlined"
                type="password"
                fullWidth
                required
                error={passwordMismatch}
                helperText={
                  passwordMismatch
                    ? "Passwords do not match"
                    : "Please confirm your password"
                }
              />

              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Stack
        direction="row"
        spacing={2}
        mt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="text" onClick={() => setIsLoginVisible(true)}>
          Login
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button variant="outlined" onClick={onGuestLogin}>
          Continue as Guest
        </Button>
      </Stack>

      {modalTitle && modalMessage && (
        <MessageModal
          title={modalTitle}
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default Register;
