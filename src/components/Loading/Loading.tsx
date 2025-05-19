import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as ShakerIcon } from "./shaker.svg";
import "./loading.css";
import theme from "../../theme";

const Loading: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      textAlign="center"
      gap={2}
    >
      <ShakerIcon
        style={{
          color: theme.palette.primary.main,
          width: "50px",
          height: "50px",
          animation: "shake 1.5s infinite",
        }}
      />
      <Typography
        style={{
          color: theme.palette.primary.main,
        }}
        variant="h6"
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
