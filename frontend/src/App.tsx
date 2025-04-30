import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
//notistack(notification)
import { SnackbarProvider } from "notistack";
//routes
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
//pages
import {
  Register,
  Login,
  Movies,
  NotFoundPage,
  MovieDetailPage,
} from "./pages";
//layout
import Layout from "./theme/layout";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
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
              element={<Layout darkMode={darkMode} setDarkMode={toggleTheme} />}
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
