import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./theme";
import { BackgroundOverlay } from "./components/Background";
import Layout from "./theme/layout";
import { Register, Login } from "./pages";
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
            <Route
              element={<Layout darkMode={darkMode} setDarkMode={toggleTheme} />}
            >
              <Route element={<PublicRoute restricted={true} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<div>Home privada</div>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
