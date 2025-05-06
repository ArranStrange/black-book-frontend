import { createTheme } from "@mui/material/styles";

const blackBookTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1d1c",
      paper: "#2a2a28",
    },
    primary: {
      main: "#d6b28d",
    },
    secondary: {
      main: "#835e98",
    },
    error: {
      main: "#af3636",
    },
    success: {
      main: "#3b891a",
    },
    text: {
      primary: "#f0e6dc",
      secondary: "#b8b0a2",
    },
    divider: "#4b4742",
  },
  typography: {
    fontFamily: "'Archivo', sans-serif",
    h1: {
      fontSize: "5.5rem",
      fontFamily: "'Archivo Black', sans-serif",
    },
    h2: {
      fontSize: "4rem",
      fontFamily: "'Archivo Black', sans-serif",
    },
    h3: {
      fontSize: "2.5rem",
      fontFamily: "'Archivo Bold', sans-serif",
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 800,
      fontFamily: "'Archivo', sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#2a2a28",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 800,
          textTransform: "uppercase",
          borderColor: "#d6b28d",
          color: "#f0e6dc",
          "&:hover": {
            backgroundColor: "rgba(214, 178, 141, 0.1)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2a2a28",
          color: "#f0e6dc",
          border: "1px solid #4b4742",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#f0e6dc",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#d6b28d",
        },
      },
    },
  },
});

export default blackBookTheme;
