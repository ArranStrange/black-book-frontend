import { createTheme } from "@mui/material/styles";

const blackBookTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1b1c1e",
      paper: "#242526",
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
      primary: "#f0f0f0",
      secondary: "#b8b8b8",
    },
    divider: "#3a3b3d",
  },
  typography: {
    fontFamily: "'Archivo', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
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
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      color: "#b8b8b8",
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
      color: "#d6b28d",
    },
    button: {
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
          color: "#f0f0f0",
          fontFamily: "'Archivo', sans-serif",
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
          backgroundColor: "	#1b1c1e",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#d6b28d",
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
          color: "#f0f0f0",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b1c1e",
          color: "#f0f0f0",
        },
      },
    },

    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "#b0b0b0",
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
          fontWeight: 800,
          textTransform: "uppercase",
          borderColor: "#d6b28d",
          color: "#f0f0f0",
          "&:hover": {
            backgroundColor: "#242526",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#d6b28d",
          backgroundColor: "#242526",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#242526",
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
          backgroundColor: "#242526",
          borderRadius: 6,
        },
      },
    },
  },
});

export default blackBookTheme;
