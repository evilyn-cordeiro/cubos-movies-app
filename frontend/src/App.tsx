import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./theme";
import { BackgroundOverlay } from "./components/Background";
import Layout from "./theme/layout";
import { Register, Login, Movies } from "./pages";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <BrowserRouter>
          <BackgroundOverlay />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              element={<Layout darkMode={darkMode} setDarkMode={toggleTheme} />}
            >
              <Route element={<PublicRoute restricted={true} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/movies" element={<Movies />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
