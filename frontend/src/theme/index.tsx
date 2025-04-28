import { createTheme, alpha } from "@mui/material";

const commonPalette = {
  primary: {
    main: "#8E4EC6",
  },
  secondary: {
    main: "rgba(183, 68, 247, 0.1)",
  },
  text: {
    primary: "#EEEEEE",
    secondary: "#B5B2BC",
  },
  info: {
    main: "#8E4EC6",
  },
  background: {
    paper: "#232225",
    default: "#1A191B",
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...commonPalette,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "none",
          height: "44px",
        },
        containedPrimary: {
          backgroundColor: "#8E4EC6",
          color: "#FFFFFF",
          "&:hover": {
            background: "#9A5CD0",
          },
          "&:disabled": {
            background: "#6F6D78",
            color: "rgba(236, 233, 253, 0.5)",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(183, 68, 247, 0.5)",
          color: "#8E4EC6",
          "&:hover": {
            backgroundColor: "rgba(183, 68, 247, 0.08)",
          },
          "&:disabled": {
            background: "#EBEAF8",
            color: "rgba(236, 233, 253, 0.5)",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#8E4EC6",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 4,
          position: "relative",
          backgroundColor: "#1A191B",
          border: "1px solid",
          borderColor: "#49474E",
          fontSize: 16,
          height: "44px",
          padding: "10px 12px",
          transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
          ]),
          "&:hover": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused": {
            boxShadow: `${alpha(
              theme.palette.primary.main,
              0.25
            )} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        }),
        input: {
          fontFamily: "'Inter', sans-serif",
          "&::placeholder": {
            color: "#6F6D78",
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#EEEEEE",
          fontSize: "18px",
          "& .MuiFormLabel-asterisk": {
            color: "#FF0000",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#232225",
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7C3AED",
    },
    secondary: {
      main: "#a591ff77",
    },
    text: {
      primary: "#1D1D1F",
      secondary: "#6E6E73",
    },
    background: {
      default: "#FAFAFB",
      paper: "#FFFFFF",
    },
    info: {
      main: "#7C3AED",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "none",
          height: "44px",
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: "#7C3AED",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#6D28D9",
          },
          "&:disabled": {
            backgroundColor: "#E5E5EA",
            color: "#A1A1AA",
          },
        },
        outlinedPrimary: {
          borderColor: "#D6BCFA",
          color: "#7C3AED",
          "&:hover": {
            backgroundColor: "#F5F3FF",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#7C3AED",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          position: "relative",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E5EA",
          fontSize: 16,
          height: "44px",
          padding: "10px 12px",
          transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
          ]),
          "&:hover": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused": {
            boxShadow: `${alpha(theme.palette.primary.main, 0.2)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
          },
        }),
        input: {
          fontFamily: "'Inter', sans-serif",
          color: "#1D1D1F",
          "&::placeholder": {
            color: "#A1A1AA",
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#49454F",
          fontSize: "16px",
          "& .MuiFormLabel-asterisk": {
            color: "#FF0000",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});
