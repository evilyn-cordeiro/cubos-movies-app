import { useNavigate } from "react-router-dom";
import { Button, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Logo from "../Logo";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: () => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const theme = useTheme();
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <header
      style={{
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Logo />
      <nav>
        <Button
          onClick={setDarkMode}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            marginRight: "0.5rem",
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>

        {isAuthenticated ? (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNavigateToRegister}>
            Cadastrar-se
          </Button>
        )}
      </nav>
    </header>
  );
}
