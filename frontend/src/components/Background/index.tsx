import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

export default function BackgroundOverlay() {
  const theme = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor =
      theme.palette.mode === "dark" ? "#121113" : "#eeeeee";
  }, [theme]);

  const overlayColor =
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 1)"
      : "rgba(255, 255, 255, 1)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          linear-gradient(to top, ${overlayColor}, transparent),
          url("src/assets/background.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        opacity: "20%",
        pointerEvents: "none",
      }}
    />
  );
}
