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
  icon: {
    main: "#EEEEEE",
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
      main: "#8E4EC6",
    },
    secondary: {
      main: "rgba(183, 68, 247, 0.5)",
    },
    text: {
      primary: "#232225",
      secondary: "#49474E",
    },
    background: {
      default: "#EBEAF8",
      paper: "#FFFFFF",
    },
    info: {
      main: "#8E4EC6",
    },
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
            backgroundColor: "#9A5CD0",
          },
          "&:disabled": {
            backgroundColor: "#6F6D78",
            color: "#ECE9FD",
          },
        },
        outlinedPrimary: {
          background: "rgba(183, 68, 247, 8)",
          color: "rgba(241, 221, 255, 98)",
          "&:hover": {
            backgroundColor: "rgba(183, 68, 247, 0.08)",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#000 !important",
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
          backgroundColor: "#F3F6F9",
          border: "1px solid",
          borderColor: "#E0E3E7",
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
          color: "#232225",
          "&::placeholder": {
            color: "#49474E",
            opacity: 1,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#232225",
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
          backgroundColor: "#EBEAF8",
        },
      },
    },
  },
});
