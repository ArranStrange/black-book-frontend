import { createTheme } from "@mui/material/styles";

const blackBookTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#202123",
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
          backgroundColor: "#242526",
          color: "#f0f0f0",
          fontFamily: "'Archivo', sans-serif",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#242526",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#242526",
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
          backgroundColor: "	#262729",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#d6b28d",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#242526",
          color: "#f0f0f0",
          border: "1px solid #3a3b3d",
          borderRadius: 8,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "#f0f0f0",
          fontWeight: 700,
          paddingBottom: 0,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "#b8b8b8",
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
            backgroundColor: "rgba(214, 178, 141, 0.1)",
            transform: "translateY(-2px)",
          },
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
