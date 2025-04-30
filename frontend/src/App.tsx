import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { SnackbarProvider } from "notistack";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

// Pages
import {
  Register,
  Login,
  Movies,
  NotFoundPage,
  MovieDetailPage,
} from "./pages";

// Layout
import Layout from "./theme/layout";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark";
    if (stored) setMode(stored);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <Layout darkMode={mode === "dark"} setDarkMode={toggleTheme} />
              }
            >
              <Route element={<PublicRoute restricted={true} />}>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Navigate to="/movies" />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
