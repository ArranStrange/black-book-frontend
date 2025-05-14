import { Box, Typography, Paper } from "@mui/material";
import { ReactComponent as SpillIcon } from "./spill.svg";
import React from "react";
import theme from "../../theme";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      textAlign="center"
    >
      <SpillIcon
        fill="currentColor"
        style={{
          color: theme.palette.primary.main,
          width: "150px",
          height: "150px",
        }}
      />
      <Paper elevation={3} sx={{ p: 2, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};
