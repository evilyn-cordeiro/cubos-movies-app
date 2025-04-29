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
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "32px",
    },
    h6: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "14px",
      textDecoration: "uppercase",
      fontWeight: "bold",
      color: "#B5B2BC",
    },
    body2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "16px",
    },
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
      main: "#402060",
    },
    secondary: {
      main: "#8145B5",
    },
    text: {
      primary: "#211F26",
      secondary: "#65636D",
    },
    background: {
      default: "#F2EFF3",
      paper: "#EAE7EC",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "32px",
      color: "#65636D",
    },
    h5: {
      color: "#211F26",
    },
    h6: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "14px",
      textTransform: "uppercase",
      fontWeight: "bold",
      color: "#E3DFE6",
    },
    body2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "16px",
    },
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        colorPrimary: "pink",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "none",
          height: "44px",
        },
        containedPrimary: {
          backgroundColor: "#402060",
          color: "#FFFFFF",
          "&:hover": {
            background: "#25004570",
          },
          "&:disabled": {
            backgroundColor: "#E0DEF1",
            color: "#A8A3B8",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(183, 68, 247, 0.5)",
          color: "rgba(183, 68, 247, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(183, 68, 247, 0.08)",
          },
          "&:disabled": {
            borderColor: "#DDD9EC",
            color: "#B0AEC0",
            background: "#F7F6FB",
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
          backgroundColor: "#FFFFFF",
          border: "1px solid #D0CED5",
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
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
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
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});
