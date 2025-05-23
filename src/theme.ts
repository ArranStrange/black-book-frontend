import { createTheme } from "@mui/material/styles";

const blackBookTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1b1c1e",
    },
    primary: {
      main: "#EBA754",
    },
    secondary: {
      main: "#FFE5C7",
      light: "#FFF6EC",
      dark: "#FFAA5C",
      contrastText: "#1C1C1E",
    },
    error: {
      main: "#af3636",
    },
    success: {
      main: "#3b891a",
    },
    text: {
      primary: "#F0F0F0",
      secondary: "#9E9E9E",
    },
    divider: "#3a3b3d",
  },
  typography: {
    fontFamily: "'Alegreya Sans', sans-serif",
    h1: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "5.5rem",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: ".2rem",
    },
    h2: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "4rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".2rem",
    },
    h3: {
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: "2.5rem",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: ".2rem",
    },
    h4: {
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: "1.5rem",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: ".1rem",
    },
    body1: {
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "'Fira Sans', sans-serif",
      fontSize: "0.875rem",
    },
    subtitle1: {
      fontFamily: "'Fira Sans', sans-serif",
      fontWeight: 900,
      fontSize: "1rem",
    },
    button: {
      fontFamily: "'Fira Sans', sans-serif",
      textTransform: "uppercase",
      fontWeight: 800,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0,0,0,0.2)",
    "0px 4px 8px rgba(0,0,0,0.25)",
    "0px 8px 16px rgba(0,0,0,0.3)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
    "0px 8px 24px rgba(0,0,0,0.2)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#1b1c1e",
          color: "#EBA754",
          fontFamily: "'Bebas Neue', sans-serif",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
          border: "1px solid #3a3b3d",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 12px 24px rgba(0,0,0,0.35)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#EBA754",
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
          color: "#EBA754",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
          color: "#EBA754",
          fontFamily: "'Bebas Neu', sans-serif",
          fontSize: "1.5rem",
          fontWeight: 900,
          textTransform: "uppercase",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "#b0b0b0",
          fontFamily: "'Fira Sans', sans-serif",
          fontWeight: 400,
          fontSize: "1rem",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
          color: "#f0f0f0",
          padding: "10px 10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          textTransform: "uppercase",
          borderColor: "#d6b28d",
          color: "#f0f0f0",
          "&:hover": {
            backgroundColor: "#1b1c1e",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#d6b28d",
          backgroundColor: "#1b1c1e",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
          borderRadius: 6,
          padding: "6px 12px",
          color: "#f0f0f0",
        },
        input: {
          "&::placeholder": {
            color: "#aaa",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#1b1c1e",
          borderRadius: 6,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#f0f0f0",
          fontFamily: "'Fira Sans', sans-serif",
          fontWeight: 300,
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05rem",
          "&.Mui-focused": {
            color: "#EBA754",
          },
          "&.Mui-error": {
            color: "#af3636",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#f0f0f0",
          fontFamily: "'Fira Sans', sans-serif",
          fontWeight: 200,
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05rem",
          "&.Mui-focused": {
            color: "#EBA754",
          },
          "&.Mui-error": {
            color: "#af3636",
          },
        },
      },
    },
  },
});

export default blackBookTheme;
