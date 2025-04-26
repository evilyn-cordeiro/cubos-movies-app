import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: () => void;
}

export default function Layout({ darkMode, setDarkMode }: LayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <Box>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
